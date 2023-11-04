import React, { useEffect, useState } from 'react';
import { useToken } from './TokenProvider';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const [formData, setFormData] = useState({
    username: '',
    description: '',
    content: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make an authenticated API request using the token
    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios.get('/api/protected-route', config)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // console.error(error);
        setLoading(false);
        navigate('/login');
      });
  }, [token]);





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    axios.post('/api/submit-form',{
      ...formData
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    }).then(response=>{
      navigate(`/blog/${response.data._id}`);
      // console.log(response);
    }).catch(error=>{
      console.error('Error:', error);
    })


  };



  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label >Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="content">Large Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="6" // Adjust the number of rows as needed
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;