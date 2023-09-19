import React, { useEffect, useState } from 'react';
import { useToken } from './TokenProvider';
import axios from 'axios';

const Form = () => {
  const { token } = useToken();
  const [formData, setFormData] = useState({
    username: '',
    description: '',
    content: '',
  });

  const [data, setData] = useState([]);
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
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [token]); // The effect depends on the token





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success (e.g., show a success message)
        // setSubmitted(true);
        console.log(response);
      } else {
        // Handle errors (e.g., show an error message)
        console.error('Form submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  if(loading)
  {
    return <h1>Loading...</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label >Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
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