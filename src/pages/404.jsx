import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">404</h1>
                <p className="text-xl text-gray-700 mt-4">Page Not Found</p>
                <p className="text-gray-500 mt-2">The page you are looking for does not exist.</p>
                <a href="/" className="text-blue-600 hover:underline mt-4 inline-block">
                    Go to Home
                </a>
            </div>
        </div>
    );
}