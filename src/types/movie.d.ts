interface IMovieItem {
    Poster: string
    Title: string
    Type: string
    Year: string
    imdbID: string
}


interface IMovieData {
    Search: IMovieItem[]
    totalResult: string
    Response: string
}

interface IMovieError {
    code: string
    messgae: string
    name: string
    response: IMovieErrorResponse
}

interface IMovieErrorResponse {
    data: {
        Error: string
        Response: string
    }
}

export interface IMovieAPIRes {
    moviesResponse: IMovieData
    totalResults: string
    Search: IMovieItem[]
    Error: IMovieError
}
