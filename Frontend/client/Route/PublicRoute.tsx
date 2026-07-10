import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PublicRoute({children}){
    const {loading,user} = useAuth();
    console.log("public one")
    if(loading)
    {
        return <div>Loading...</div>
    }

    if(user)
    {
        return <Navigate to="/dashboard" replace/>
    }

    return <>{children}</>

}