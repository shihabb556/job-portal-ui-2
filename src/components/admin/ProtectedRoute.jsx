import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth); // Get the user from the Redux store
    const navigate = useNavigate();

    useEffect(() => {
        // If there's no user or the role is not 'recruiter', redirect to home
        if (!user || user?.user?.role !== 'recruiter') {
            console.log('Unauthorized user, redirecting...');
            navigate("/"); // Redirect to home page or login
        }
    }, [user, navigate]);

    // Only render children if user is authorized
    if (!user || user?.user?.role !== 'recruiter') {
        return null; // Optionally, you can show a spinner or a loading state
    }

    return children;
};

export default ProtectedRoute;
