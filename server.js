const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/md-forum', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Create a Mongoose model for your data
const MDPost = mongoose.model('posts', {
    username: String,
    description: String,
    content: String,
});

app.get('/api/posts', async (req, res) => {
    console.log("heh")
    try {
      // Fetch all posts from the database
      const posts = await MDPost.find({}, 'username description');
  
      // Send the username and description of all posts as JSON
      res.json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Error fetching posts' });
    }
  });

  // Define a route to get a post by ID
app.get('/api/md/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;

    // Fetch the post by ID from the database
    const post = await MDPost.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Send the post as JSON
    res.json(post);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ error: 'Error fetching post by ID' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './build')));

// Handle other routes and return the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});


// API endpoint to handle form submissions
app.post('/api/submit-form', async (req, res) => {
    // Retrieve form data from the request body
    const { username, description, content } = req.body;
    console.log({ username, description, content });
    // res.json({ username, description, content });

    // Create a new document using the Mongoose model
    const newSubmission = new MDPost({
        username,
        description,
        content,
    });

    // Save the document to the database
    try {
        // Save the document to the database and await the promise
        const savedSubmission = await newSubmission.save();
        console.log('Form submission saved:', savedSubmission);
        res.json(savedSubmission);
      } catch (error) {
        console.error('Error saving submission:', error);
        res.status(500).json({ error: 'Error saving submission' });
      }
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});