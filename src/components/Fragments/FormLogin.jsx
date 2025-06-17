import { useEffect, useRef } from 'react';
import Button from '../Elements/Button';
import InputForm from '../Elements/Input';

const FormLogin = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("email", e.target.email.value);
    localStorage.setItem("password", e.target.password.value);
    window.location.href = "/products";
  }
  const emailRef = useRef(null);

  useEffect(()=>{
    emailRef.current.focus();
  }, [])
  return (
      <form onSubmit={handleLogin}>
        <InputForm
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
          classname="bg-white"
          ref={emailRef}
        />
        <InputForm
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          classname="bg-white"
        />
        <div className="mb-4">
          <Button classname="bg-blue-600 w-full" type="submit">Login</Button>
        </div>
      </form>
  )
}

export default FormLogin;

