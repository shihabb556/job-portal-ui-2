import { Link } from "react-router-dom";


const NotFound = ()=>{

    return(

        <div className="min-h-[100vh] min-w-full bg-gray-400  flex justify-center items-center" >
            <h2 className="text-center  my-auto">404 Not Found Back to <Link className="text-red-800 underline" to='/'>Home</Link></h2>
        </div>
    )
}

export default NotFound;