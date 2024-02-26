import prisma from "../utils/db.server";

import express,{ NextFunction, Request, Response } from "express"

export const drinksOrder=express.Router();


type drinksOrderData={
    id:string,
    created_at:Date,
    drinks:string,
    drinksQuantity:number,
    description?:string,
    completed:boolean,
    userId:string
}

type updatedDrinksOrderData={
    id:string,
    food:string,
    foodQuantity:number,
    description?:string,   
}

// to create an drinks
drinksOrder.post("/",async(req:Request,res:Response,next:NextFunction)=>{
 
    try {
        const data:drinksOrderData[]=req.body;

        const megaDrinksOrder=await prisma.megaDrinksOrder.create({
            data:{
                userId:data[0].userId
            }
        })
        if(!megaDrinksOrder){
            return res.status(400).json({success:false,errorMessage:`An error occured while creating megaDrinksOrder.`})  
        }

        const orderDataArray = data.map((dat) => ({
            completed: false,
            drinks: dat.drinks,
            drinksQuantity: dat.drinksQuantity,
            megaDrinksOrderId: megaDrinksOrder.id,
            description: dat.description?? null,
        }));
        const drinksOrder = await prisma.drinksOrder.createMany({
            data: orderDataArray,
        });


           if(!drinksOrder){
            return res.status(400).json({success:false,errorMessage:"Your drinks order was not created."}) 
        }
        return res.status(200).json({success:true,errorMessage:"Your drinks order was created successfully."}) 
       
     
    } catch (error) {
        next(error)
    }
}
)

//To mark the completion of a drinks Order

drinksOrder.patch("/",async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {drinksOrderId}=req.body;
      if(!drinksOrderId){
        return res.status(400).json({success:false,errorMessage:"Invalid drinks orderId."})
      }
      const drinksOrder= await prisma.drinksOrder.findUnique({
        where:{
            id:  drinksOrderId
        }  
    })
    if(!drinksOrder){
        return res.status(400).json({success:false,errorMessage:`Invalid orderId ${drinksOrderId}`})
    }
          const orderCompleted=await prisma.drinksOrder.update({
              where:{
                  id:drinksOrderId
                },

                data:{
                    
                    completed:true
                }
            })

            if(!orderCompleted){
                return res.status(400).json({success:false,errorMessage:"Your drinks order was not found."})
            }
            return res.status(200).json({success:true,message:`Your order ${drinksOrderId} was completed successfully.`})
           
        
    } catch (error) {
        next(error) 
    }
})


//TO delete an drinsk order

drinksOrder.delete("/:id",async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.params.id;
 
    try {
        const order=await prisma.drinksOrder.findUnique({
            where:{
                id:  id
            }  
        })
        if(!order){
            return res.status(400).json({success:false,errorMessage:`Invalid drinks orderId ${id}`}) 
        }
          const deleteOrder=await prisma.drinksOrder.delete({
        where:{
            id:  id
        }
    })
    if(!deleteOrder){
        return res.status(400).json({success:false,errorMessage:"Your drinks order was not deleted."})
    }
    return res.status(200).json({success:true,message:`Your drinks order of id ${id} was deleted successfully.`})
  
    } catch (error) {
        next(error) 
    }
  
})


//To edit a food order or
//To complete a food order

drinksOrder.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try { 
            const { drinks, drinksQuantity, description } = req.body;

            const drinksOrder = await prisma.drinksOrder.findUnique({
                where: {
                    id: id
                }
            });
         
            if (!drinksOrder) {
                return res.status(404).json({success:false,errorMessage:`Drinks order of id ${id} is not available.`});
             
            }
            const updatedDrinksOrder = await prisma.drinksOrder.update({
                where: {
                    id: id
                },
                data: {
                    drinks: drinks,
                    drinksQuantity: drinksQuantity,
                    description: description
                }
            });
            if (!updatedDrinksOrder) {
                return res.status(400).json({success:false,errorMessage:"Your drinks order was not updated."});
            }
            return res.status(200).json({success:true,message: `Drinks item with ID ${id} updated successfully`});
           
        }
     catch (error) {
        next(error);
    }
});

