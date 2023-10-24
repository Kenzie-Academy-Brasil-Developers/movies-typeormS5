import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.error";
import { Movie } from "../entities";
import { movieRepo } from "../repositories";


export const uniqueName = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body
    if(!name){
        return next()
    }

    const nameMovie: Movie | null = await movieRepo.findOne({where: {name: name}})
    if(nameMovie) {
        throw new AppError("Movie already exists.", 409)
    }
    return next()
}