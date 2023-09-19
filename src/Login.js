import React, { useState } from 'react';
import axios from 'axios';
import { useToken } from './TokenProvider';
import { useNavigate } from 'react-router-dom';

function Login() {
    const { setToken } = useToken();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
    //   console.log(response);
      const token = response.data.token;
      setToken(token);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;