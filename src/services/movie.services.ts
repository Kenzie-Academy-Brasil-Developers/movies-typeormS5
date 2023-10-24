import { Movie } from "../entities";
import { MovieCreate, MovieRead, MovieUpdate } from "../interfaces/movies.interfaces";
import { Pagination, PaginationParams } from "../interfaces/pagination.interface";
import { movieRepo } from "../repositories";

export const createMovieService = async (data: MovieCreate): Promise<Movie> => {
    const newMovie: Movie = await movieRepo.save(data)

    return newMovie
}


export const readMovieService = async ({nextPage,order,page,perPage,prevPage,sort}: PaginationParams): Promise<Pagination> => {
    const [movies, count] = await movieRepo.findAndCount({
        order: { [sort]: order },
        skip: page,
        take: perPage
    })

    return {
        prevPage: page <= 1 ? null : prevPage,
        nextPage: count - page <= perPage ? null : nextPage,
        count,
        data: movies
    }
}


export const  updateMovieService = async (movie: Movie, data: MovieUpdate) => {
    return await movieRepo.save({...movie, ...data})
}

export const deleteMovieService = async (movie: Movie): Promise<void> => {
    await movieRepo.remove(movie)
}