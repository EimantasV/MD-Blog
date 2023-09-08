import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {

  const [posts, setPosts] = useState([]);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    fetch('/api/posts')
          .then((response) => {
      // Check if the response status is okay (2xx)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Create a readable stream and a text reader
      const reader = response.body.getReader();
      let result = '';

      // Read chunks of data and concatenate them
      const read = () => {
        return reader.read().then(({ done, value }) => {
          if (done) {
            return result;
          }
          result += new TextDecoder('utf-8').decode(value);
          return read();
        });
      };

      // Start reading and parse the result as JSON
      return read();
    })
      .then((data) => setPosts((JSON.parse(data))))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);


  useEffect(() => {
    let temp =[]
    for(const a of posts)
    {
      console.log(a)
      temp.push(<Link to={`/blog/${a._id}`}><h2>{a.username}</h2><p>{a.description}</p></Link>)
    }
    setElements(temp);
    console.log(elements)
  }, [posts]);

  return (
    <div className="App">
      <h1>hello</h1>
      {elements}
    </div>
  );
}

export default App;
