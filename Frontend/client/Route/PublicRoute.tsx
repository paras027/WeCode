import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function PublicRoute({children}){
    const {loading,user} = useAuth();

    if(loading)
    {
        return <div className="mx-auto max-w-5xl space-y-6 p-6">
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-52 w-full rounded-xl" />
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
    }

    if(user)
    {
        return <Navigate to="/dashboard" replace/>
    }

    return <>{children}</>

}