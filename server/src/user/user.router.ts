import prisma from "../utils/db.server";

import express,{ NextFunction, Request, Response } from "express"


export const userRouter=express.Router();

type userData={
    Email:string,
    userName:string,
    uuid:string,
}

userRouter.post("/",async(req:Request,res:Response,next:NextFunction)=>{
    try {
    const {Email,userName,uuid}:userData=req.body;
    const user=await prisma.user.create({
        data:{
            Email:Email,
            userName:userName,
            uuid:uuid
        }
    })

    if(!user){
        return res.status(404).json("User not created")
        
    }
    return res.status(200).json("User created successfully.")
} catch (error) {
      next(error)  
}
})