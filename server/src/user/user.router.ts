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


//To get all the orders of a user

userRouter.get("/:userId",async(req:Request,res:Response,next:NextFunction)=>{
    const {userId}=req.params

    const user=await prisma.user.findUnique({
        where:{
            uuid:userId
        }
    })
if(!user){
    return res.status(404).json(`User of id ${userId} was not found.`)
}
    const orders=await prisma.megaOrder.findMany({
        where:{
            userId:userId
        },
  
   include:{
    order:{
        select:{
            id:true,
            created_at:true,
            food:true,
            drinks:true,
            quantity:true,
            description:true,
            location:true,   
            completed:true,
        }
    }
   }
    })

    if(!orders){
        return res.status(400).json(`Cannot get orders of user id ${userId}.`)
    }
    return res.status(200).json(orders)
})