import { Router } from "express";
import { UpdateMovieController, createMovieController, deleteMovieController, readMovieController } from "../controllers/movies.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { movieCreateSchema, movieUpdateSchema } from "../schemas/movies.schema";
import { uniqueName } from "../middlewares/uniqueName.middleware";
import { pagination } from "../middlewares/pagination.middleware";
import { verifyIdExists } from "../middlewares/verifyId.middleware";


export const movieRouter: Router = Router()

movieRouter.post('/',validateBody(movieCreateSchema),uniqueName, createMovieController)
movieRouter.get('/',pagination, readMovieController)

movieRouter.use('/:movieId', verifyIdExists)

movieRouter.patch('/:movieId',validateBody(movieUpdateSchema), uniqueName, UpdateMovieController)
movieRouter.delete('/:movieId', deleteMovieController)