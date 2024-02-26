import prisma from "../utils/db.server";

import express, { NextFunction, Request, Response } from "express"

export const megaOrderRouter = express.Router();

megaOrderRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get today's date
        let today = new Date();

        // Set hours, minutes, and seconds to 0 to get the start of the day
        today.setHours(0, 0, 0, 0);

        // Set the end of the day
        let endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        // Query for orders created between start and end of today
        const getmegaOrder = await prisma.megaOrder.findMany({
            where: {
                created_at: {
                    gte: today,
                    lte: endOfDay
                }
            },
            include: {
                FoodOrder: {
                    where: {
                        completed: false
                    },
                    select: {
                        id: true,
                        created_at: true,
                        foodQuantity: true,
                        description: true,
                        completed: true,
                    }
                }
            }
        });

        if (!getmegaOrder || getmegaOrder.length === 0) {
            return res.status(404).json("No mega orders found for today.");
        }

        return res.status(200).json(getmegaOrder);
    } catch (error) {
        next(error);
    }
});

// To get a megaOrder


megaOrderRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {


        const id: string = req.params.id

        const megaOrder = await prisma.megaOrder.findUnique({
            where: {

                id: id
            },
            include: {
                FoodOrder: {
                    select: {
                        id: true,
                        created_at: true,
                        food: true,
                        foodQuantity: true, 
                        description: true,
                        completed: true,
                    }
                }


            }
        })

        if (!megaOrder) {
            return res.status(404).json(`No megaOrder of id ${id} was found.`)
        }
        return res.status(200).json(megaOrder)
    } catch (error) {
        next(error);
    }
})
