import prisma from "../utils/db.server";

import express, { NextFunction, Request, Response } from "express"

export const megaDrinksOrderRouter = express.Router();


//To get all the mega drink orders of today which are not completed
megaDrinksOrderRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get today's date
        let today = new Date();

        // Set hours, minutes, and seconds to 0 to get the start of the day
        today.setHours(0, 0, 0, 0);

        // Set the end of the day
        let endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        // Query for orders created between start and end of today
        const getMegaDrinksOrder = await prisma.megaDrinksOrder.findMany({
            where: {
                created_at: {
                    gte: today,
                    lte: endOfDay
                }
            },
            include: {
                DrinksOrder: {
                    where: {
                        completed: false
                    },
                    select: {
                        id: true,
                        created_at: true,
                        drinks:true,
                        drinksQuantity: true,
                        description: true,
                        completed: true,
                    }
                }
            }
        });

        if (!getMegaDrinksOrder || getMegaDrinksOrder.length === 0) {
            return res.status(404).json("No mega orders found for today.");
        }

        return res.status(200).json(getMegaDrinksOrder);
    } catch (error) {
        next(error);
    }
});

// To get a mega Drink Order


megaDrinksOrderRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {


        const id: string = req.params.id

        const megDrinksOrder = await prisma.megaDrinksOrder.findUnique({
            where: {

                id: id
            },
            include: {
                DrinksOrder: {
                    select: {
                        id: true,
                        created_at: true,
                        drinks: true,
                        drinksQuantity: true, 
                        description: true,
                        completed: true,
                    }
                }


            }
        })

        if (!megDrinksOrder) {
            return res.status(404).json(`No megaOrder of id ${id} was found.`)
        }
        return res.status(200).json(megDrinksOrder)
    } catch (error) {
        next(error);
    }
})
