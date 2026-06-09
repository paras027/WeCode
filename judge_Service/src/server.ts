import express from "express"
import app from "./app"
import env from "./config/env";

app.listen(env.PORT,()=>{
    console.log("Judge Service Started");
})

