import { IMovieError, IMovieItem } from 'types/movie'
// src/recoil/Movie.ts
import { atom } from "recoil"


export interface ICurrenMovie {
  title: string
  page: number
}

export interface IFindError {
  response: boolean
  message: string
}

// Movie Search Input에서 입력하는 값을 atom으로 관리
export const currentMovieState = atom<ICurrenMovie>({
  key: 'currentMovieState',
  default: {
    title: '',
    page: 1
  }
})

// Movie Search Input에서 입력하는 값을 atom으로 관리
export const errorMovieState = atom<IFindError>({
  key: 'errorMovieState',
  default: {
    response: true,
    message: '',
  }
})

// 업데이트 시킬 Movies atom 배열
export const MoviesState = atom<IMovieItem[]>({
  key: 'Movies',
  default: [],
})
