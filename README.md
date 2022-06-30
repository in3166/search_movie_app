# **영화 검색 애플리케이션**
- 영화 검색과 즐겨찾기 추가/제거 등을 할 수 있는 애플리케이션입니다.
- **[데모 페이지](https://geta-movies.netlify.app/)**

<br>

## 초기 화면 구성
![design1](https://user-images.githubusercontent.com/45654988/168460372-d4603425-faf9-48b9-9999-f09491859c07.PNG)
- 검색 바 토글
- 하단 검색 탭과 즐겨찾기 탭
- 영화 리스트

<br>

## 페이지 설명
- 상단에 검색 바 고정
- 헤더 클릭 시 scroll to top
- 중간에 영화 리스트 출력
- 하단에 검색 탭, 즐겨찾기 탭을 둬서 라우팅
<br>

### 검색 탭
- 검색 탭은 상단에 "입력/검색" 버튼 
- 중간에 검색 결과 화면 출력
  - 한 줄에 하나의 영화 리스트 (`Poster`, `Title`, `Type`, `Year`)

- 처음 검색 결과 영역은 "검색 결과가 없습니다."로 노출
- 영화 리스트 클릭 시 "즐겨찾기 추가/제거" 모달 오픈
- 무한 스크롤 구현 (`IntersectionObserver`)

### 검색 버튼 
- 상단 고정
- 검색 창을 토글 형식으로 열고 닫음
- `form`의 `onSubmit`을 사용해 엔터키 사용 가능
- 검색을 하면 검색 탭에서 결과를 출력

### 영화 클릭
- 선택 창이 뜨며 "즐겨찾기, 취소"
- 즐겨찾기 로컬에 저장해 다음 접속 시 조회 가능 (store)
- 이미 즐겨찾기한 영화를 클릭하면 => 모달에서 즐겨찾기 '취소'

- 이미 즐겨찾기된 영화는 검색리스트에서 표시
  - 영화 리스트 오른쪽 위에 별로 표시
  - 별을 클릭해도 바로 즐겨찾기 추가와 제거 가능

### 즐겨찾기 탭
- 즐겨찾기한 영화 목록 출력
- 아이템 누르면 "즐겨찾기 제거 or 취소" 모달
- 즐겨찾기 해제를 누르면 즉시 제거
- 별도의 페이징 없이 한 번에 모든 데이터 로딩

## 추가 기능
- 즐겨찾기 탭에서 목록 순서 조정 (편집)
  - 즐겨찾기한 영화들의 순서를 드래그&드롭으로 조절
  - 오른쪽 위의 목록 편집 버튼을 클릭하면 순서 편집 가능 
  - 옮길 영화를 드래그하여 타겟 영화 위로 옮기면 목록의 순서가 바뀐다.

```ts
// MovieItem.ts
// ...
return (
  <li
    onDragOver={handleOnDragOver}
    onDragStart={handleOnDragStart}
    onDragEnd={handleOnDragEnd}
    onDrop={handleOnDrop}
    onDragEnter={handleOnDragEnter}
    onDragLeave={handleOnDragLeave}
  > 
)
//  ...
  
// 드래그 한 요소(`grab`)이 Drop 될 때 `current` 요소와 위치를 비교해 자리를 바꾼다.
// hooks/useDragList.ts

const useDragList = ({ setDragVisible, setGrab, setGrabbing, grab, favoriteMovies, setFavoriteMovies }: IUseDragListProps) => {
  // ...
  const handleOnDrop = (e: DragEvent<HTMLLIElement>) => {
    let grabPosition
    if (grab) {
      grabPosition = Number(grab.dataset.position)
      const targetPosition = Number(e.currentTarget.dataset.position)
      const list = [...favoriteMovies]

      if (grabPosition < targetPosition) {
        list.splice(targetPosition + 1, 0, list[grabPosition])
        list.splice(grabPosition, 1)
      } else if (grabPosition > targetPosition) {
        list.splice(targetPosition, 0, list[grabPosition])
        list.splice(grabPosition + 1, 1)
      }

      store.remove(LOCAL_STORAGE_KEY)
      store.set(LOCAL_STORAGE_KEY, list)
      setFavoriteMovies(list)
    }
    setDragVisible(false)
  }
  // ...
```      
 
- `Suspense`를 사용, 로딩 화면 구현
- `ErrorBoundary` 기능 추가

<br><br>

## 사용 Stacks
- React
- Typescript
- react-router-dom
- Sass
- Sass-loader
- recoil
- store

- axios
  - interceptors 적용 (`interceptors.response.use`)
  - API 호출의 `response` 결과물을 수정해서 다시 요청한 곳으로 보냄
 ```ts
 // ...
 axiosInstance.interceptors.response.use(
  (res) => {
    res.data.movieList = res.data.Search.map((value: ISearchResponse) => {
      return {
        poster: value.Poster,
        title: value.Title,
        type: value.Type,
        year: value.Year,
        imdbID: value.imdbID,
        isLiked: false,
      }
    })
    return Promise.resolve(res)
  },
// ...
```

- classnames
- react-router-dom
- IntersectionObserver
- react-error-boundary
<br>

- Eslint
- Prettier
- Eslint-config-airbnb
- Eslint-config-prettier

<br><br>
