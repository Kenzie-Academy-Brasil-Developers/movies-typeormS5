import { Request, Response } from "express";
import { Movie } from "../entities";
import { createMovieService, deleteMovieService, readMovieService, updateMovieService } from "../services/movie.services";
import { Pagination } from "../interfaces/pagination.interface";

export const createMovieController = async (req: Request, res: Response): Promise<Response> => {
    const newMovie: Movie = await createMovieService(req.body)

    return res.status(201).json(newMovie)
}

export const readMovieController = async (req: Request, res: Response): Promise<Response> => {
    const movies: Pagination = await readMovieService(res.locals.pagination)

    return res.status(200).json(movies)
}

export const UpdateMovieController = async (req: Request, res: Response): Promise<Response> => {
   const {foundMovie} = res.locals
   const {body} = req

   const movie: Movie = await updateMovieService(foundMovie, body)

    return res.status(200).json(movie)
}

export const deleteMovieController = async (req: Request, res: Response): Promise<Response> => {
    await deleteMovieService(res.locals.foundMovie)

    return res.status(204).json()
}