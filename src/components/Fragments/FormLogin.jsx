import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from '../Elements/Button';
import InputForm from '../Elements/Input';

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginFailed("");

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const API_LOGIN_URL = "https://freshtrack.azurewebsites.net/api/auth/login";
    // const API_LOGIN_URL = "https://fakestoreapi.com/auth/login";
    axios.post(API_LOGIN_URL, data)
      .then((res) => {
        // localStorage.setItem("token", res.data.token);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("token_type", res.data.token_type);
        localStorage.setItem("username", data.username); 
        window.location.href = "/products";
      })
      .catch((err) => {
        setLoginFailed(err.response?.data || "Login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleLogin}>
      {loginFailed && <p className="text-red-500 text-center text-sm mb-4">{loginFailed}</p>}
      <InputForm
        label="Username"
        name="username"
        placeholder="Enter your username"
        type="text"
        classname="bg-white"
        ref={usernameRef}
      />
      <InputForm
        label="Password"
        name="password"
        placeholder="Enter your password"
        type="password"
        classname="bg-white"
      />
      <div className="mb-4">
        <Button 
          classname={`bg-blue-600 w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </form>
  );
};

export default FormLogin;