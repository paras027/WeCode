import { useContext,createContext,useState, useEffect } from "react"
import api from "@/api/axios";

const authContext = createContext(null)

export function AuthProvider({children}){
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    console.log("auth w0rking")
    async function fetchUser(){
        try{
            console.log("auth w0rking1")
            const user = await api.get("/user/me",
                {
                withCredentials:true
            })
            console.log("auth w0rking2")
            setUser(user.data.user);
        }
        catch(e)
        {
            setUser(null);
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUser();
    },[])
    return (
        <authContext.Provider
            value={{user,setUser,loading}}
        >{children}</authContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(authContext);
    if(!context){
        throw new Error("Use Auth must be used inside Auth Provider")
    }
    return context
}