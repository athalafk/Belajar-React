import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/auth';
import { useMutation } from '@tanstack/react-query';

import Button from '../Elements/Button';
import InputForm from '../Elements/Input';

const FormLogin = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data, variables) => {
      console.log("Login successful:", data);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);
      localStorage.setItem("username", variables.username); 
      navigate("/products");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    mutation.mutate(credentials);
  };

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <form onSubmit={handleLogin}>
      {mutation.isError && (
        <div className="mb-4 text-red-500">
          {mutation.error?.response?.data?.message || "Login failed. Please try again."}
        </div>
      )}
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
          classname={`bg-blue-600 w-full ${mutation.isloading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          type="submit"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </div>
    </form>
  );
};

export default FormLogin;