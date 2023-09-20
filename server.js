const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./AuthToken");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect("mongodb://localhost:27017/md-forum", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create a Mongoose model for your data
const MDPost = mongoose.model("posts", {
  title: String,
  description: String,
  content: String,
  username: String,
});

const User = mongoose.model("users",
  {
    username: String,
    password: String,
  });


app.get('/api/protected-route', authenticateToken, (req, res) => {

  const username = req.user.username;

  res.json({ message: 'Access granted for user ' + username });
});


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      console.log(username, "OK")
      const token = jwt.sign({ username: user.username }, 'P5j^2b4L$ZuV7#s@G!9wQ');
      // console.log(token)
      return res.json({ token: token });
    } else {
      return { success: false, message: 'Incorrect password' };
    }
  } catch (error) {
    return { success: false, message: 'Internal Server Error' };
  }
});


app.delete("/api/delete-post", authenticateToken, async (req, res) => {
  const id = req.header('id');
  try {
    // Find the post by ID and delete it
    const post = await MDPost.findById(id);
    console.log("Deleting! Post creator:",post.username,", Delete called by:", req.user.username );
    if (post.username != req.user.username) {
      return res.status(403).json({ message: 'Authentication failed. Invalid token.' });
    }

    const deletedPost = await MDPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Server error' });
  }
})

app.get("/api/posts", async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await MDPost.find({}, "title username description");

    // Send the username and description of all posts as JSON
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

app.get("/api/myposts", authenticateToken, async (req, res) => {
  const name = req.user.username;
  try {
    // Fetch all posts from the database
    const posts = await MDPost.find({ username: name }, "title username description");

    // Send the username and description of all posts as JSON
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});


app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  // console.log(username, password);
  // Check if the username is already taken
  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }


    // Hash the password and create a new user
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      password: hash,
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully' });
  }
  catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get("/api/md/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;

    // Fetch the post by ID from the database
    const post = await MDPost.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Send the post as JSON
    res.json(post);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ error: "Error fetching post by ID" });
  }
});

// API endpoint to handle form submissions
app.post("/api/submit-form", authenticateToken, async (req, res) => {
  const { title, description, content } = req.body;
  const { username } = req.user;
  // console.log({ username, description, content });
  const newSubmission = new MDPost({
    title,
    description,
    content,
    username,
  });

  // Save the document to the database
  try {
    // Save the document to the database and await the promise
    const savedSubmission = await newSubmission.save();
    console.log("Form submission saved:", username);
    res.json(savedSubmission);
  } catch (error) {
    console.error("Error saving submission:", error);
    res.status(500).json({ error: "Error saving submission" });
  }
});






// Serve static files from the React app
app.use(express.static(path.join(__dirname, "./build")));

// Handle other routes and return the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
