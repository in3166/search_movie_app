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


interface IMovieErrorResponse {
    data: {
        Error: string
        Response: string
    }
}

// 사용 x?
export interface IMovieError {
    code: string
    message: string
    name: string
    response: IMovieErrorResponse
}

export interface IMovieAPIRes {
    moviesResponse: IMovieData
    totalResults: string
    Search: IMovieItem[]
    Error: string
}
