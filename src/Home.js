import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function App() {

  const [posts, setPosts] = useState([]);
  const [elements, setElements] = useState([]);

  useEffect(() => {

    axios.get('/api/posts', {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);


  useEffect(() => {
    let temp = []
    for (const a of posts) {
      console.log(a)
      temp.push(<Link to={`/blog/${a._id}`}><h2>{a.title}</h2><p>{a.description}</p><hr /></Link>)
    }
    setElements(temp);
    // console.log(elements)
  }, [posts]);

  return (
    <div className="App">
      <h1>Posts:</h1>
      <hr/>
      {elements}
    </div>
  );
}

export default App;
