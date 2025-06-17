import Button from '../Elements/Button';
import InputForm from '../Elements/Input';

const FormRegister = () => {
    return (
        <form action="">
        <InputForm
            label="Full Name"
            name="fullname"
            placeholder="Enter your full name"
            type="text"
            classname="bg-white"
          />
          <InputForm
            label="Email"
            name="email"
            placeholder="Enter your email"
            type="email"
            classname="bg-white"
          />
          <InputForm
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
            classname="bg-white"
          />
        <InputForm
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Enter your password"
            type="password"
            classname="bg-white"
          />
          <div className="mb-4">
            <Button classname="bg-blue-600 w-full">Register</Button>
          </div>
        </form>
    )
}

export default FormRegister;

