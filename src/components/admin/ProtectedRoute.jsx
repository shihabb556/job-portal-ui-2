import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    let respUser;
    if(user){
        respUser = user?.user || {};
        console.log('resp user: ',respUser)
    };



    useEffect(()=>{
        if(respUser === null || respUser.role !== 'recruiter'){
            console.log('resp user null')
            navigate("/");
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
};
export default ProtectedRoute;