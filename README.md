제작 기간 : 2022-11-21 ~ 2022-12-20 (30일, 매일 0 ~ 7시간)

## 기능 목록

- ✅ CRUD(Create, read, update, delete) 상품 피드백 요청글
  - useContext 이용해서 더미 json 파일로부터 기능 구현
  - ✅ Firebase 연동
- ✅ 피드백 요청글을 생성하고 편집할 때 유효성 검사
- ✅ most/least upvotes와 most/least comments 순으로 글 정렬
- ✅ 카테고리별 글 필터링
- ✅ 글마다 comments와 replies 추가
- ✅ UpVote 기능
- ✅ mobile first
- ✅ 기기마다 최적 레이아웃 설정
  - ✅ mobile
  - ✅ tablet
  - ✅ desktop

* [Figma 디자인 파일 사용 - Frontend-mentor](https://www.frontendmentor.io/challenges/product-feedback-app-wbvUYqjR6)

## Refactoring

Refactoring 기간 : 2023-01-09 ~ 진행중

#### 목표

- 타입 지정을 위해 TypeScript로 재작성
- `useEffect()` 의존성 항목을 다 쓰지 않은 것들 수정 (문법 오류)
- Context가 너무 많아져서 Reducer로 변경 (비동기 처리는 Thunk 사용)
- 값이 변경될 때마다 호출해서 너무 많은 API 호출을 Reducer에 값을 업데이트 하여 호출 횟수 줄이기
- 로딩 화면은 애니메이션으로 변경, 에러 컴포넌트 추가
- 그 외 : 폴더 정리, 파일명 수정, 컴포넌트화 수정, data 형식 변경해 API 호출하기 쉽게 변경, 버튼 비활성화 기능 추가 등

#### 진행 과정

- ✅ Suggestions Page
- ✅ Detail Page
- ✅ Edit Page
- ⬜ Roadmap Page
- ⬜ Add Page
