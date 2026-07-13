import {io} from "socket.io-client"

const socket = io(import.meta.env.BASE_URL.replace("/api/v1","/"),{
    autoConnect:false,
    withCredentials:true
})
export default socket