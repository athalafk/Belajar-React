import { Link } from 'react-router-dom';

const AuthLayout = (props) => {
    const { children, title } = props;
    return (
        <div className="flex justify-center min-h-screen items-center">
            <div className="w-full max-w-sm">
                <h1 className="text-3xl font-bold mb-2 text-blue-600"> {title}</h1>
                <p className="font-medium text-slate-500 mb-8">
                    Welcome, Please enter your credentials below.
                </p>
                {children}
                <p className="text-center text-sm text-slate-500 mt-4">
                    {title === "Login" ? (
                        <>
                            Don't have an account?
                            <Link to="/register" className="text-blue-600 hover:underline ml-1">
                                Register here
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?
                            <Link to="/login" className="text-blue-600 hover:underline ml-1">
                                Login here
                            </Link>
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}

export default AuthLayout;