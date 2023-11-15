import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from './TokenProvider';

function App() {
  navigate = useNavigate();
  const { token } = useToken();
  const [posts, setPosts] = useState([]);
  const [elements, SetElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {

    axios.get('/api/myposts', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    })
      .then((response) => {
        // console.log(response.data);
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // console.error(error);
        navigate('/login');
      });

  }, [refresh]);

  const handleDelete = async (id) => {


    axios.delete('/api/delete-post',
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'id':id
      },
    })
    
    .then(response=>{
      console.log(response);
      setRefresh(!refresh);
      // navigate(`/myposts`);
    })
    
    .catch(error=>{
      console.error('Error:', error);
    })


  };


  useEffect(() => {
    let temp = []
    for (const a of posts) {
      console.log(a)
      temp.push(<div><Link to={`/blog/${a._id}`}><h2>{a.title}</h2><p>{a.description}</p></Link><button onClick={()=>handleDelete(a._id)}>Delete</button><button>Edit</button><hr /></div>)
    }
    SetElements(temp);
    // console.log(elements)
  }, [posts]);

  if (loading) {
    return <h1>Loading...</h1>
  }
  return (
    <div className="App">
      <h1>Posts:</h1>
      <hr/>
      {elements}
    </div>
  );
}

export default App;
