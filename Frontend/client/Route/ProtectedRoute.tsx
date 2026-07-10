import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children}){
    const {loading,user} = useAuth();
    console.log("protected working")
    if(loading)
    {
        return <div>Loading...</div>
    }

    if(!user)
    {
        return <Navigate to="/login" replace/>
    }

    return <>{children}</>

}