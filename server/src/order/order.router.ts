import prisma from "../utils/db.server";

import express,{ NextFunction, Request, Response } from "express"

export const orderRouter=express.Router();


type orderData={
    food:string,
    quantity:number,
    location?:string,
    megaOrderId:string,
    description?:string,
    drinks?:string,
    userId:string
}

// to create an order
orderRouter.post("/",async(req:Request,res:Response,next:NextFunction)=>{


   
    try {
        console.log(req.body)
        const data:orderData[]=req.body;

        const megaOrder=await prisma.megaOrder.create({
            data:{
                userId:data[0].userId
            }
        })
        if(!megaOrder){
            return res.status(400).json(`An error occured.`)  
        }

        const orderDataArray = data.map((dat) => ({
            completed: false,
            food: dat.food,
            quantity: dat.quantity,
            megaOrderId: megaOrder.id,
            location: dat.location?? null,
            description: dat.description?? null,
            drinks: dat.drinks?? null,
        }));
        const order = await prisma.order.createMany({
            data: orderDataArray,
        });


           if(!order){
            return res.status(400).json("Your order was not created.")
        }
        return res.status(200).json(`Your order was created successfully.`)
       
     
    } catch (error) {
        next(error)
    }
}
)

//To mark the completion of a Order

orderRouter.patch("/",async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {orderId}=req.body;
      if(!orderId){
        return res.status(400).json("Invalid OrderId.")
      }
          const orderCompleted=await prisma.order.update({
              where:{
                  id:orderId
                },

                data:{
                    
                    completed:true
                }
            })

            if(!orderCompleted){
                return res.status(400).json("Your order was not found.")
            }
            return res.status(200).json(`Your order ${orderId} was completed successfully.`)
        
    } catch (error) {
        next(error) 
    }
})

