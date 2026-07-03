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

Refactoring 기간 : 2023-01-09 ~ 2023-02-16

#### 목표

- 타입 지정을 위해 TypeScript로 재작성
- `useEffect()` 의존성 항목을 다 쓰지 않은 것들 수정 (문법 오류)
- Context가 너무 많아져서 Reducer로 변경 (비동기 처리는 Thunk 사용)
- 값이 변경될 때마다 호출해서 너무 많은 API 호출을 Reducer에 값을 업데이트 하여 호출 횟수 줄이기
- 로딩 화면은 애니메이션으로 변경, 에러 컴포넌트 추가
- sort, category의 경우 reducer 대신 query에 넣어 reducer 감소
- 그 외 : 폴더 정리, 파일명 수정, 컴포넌트화 수정, data 형식 변경해 API 호출하기 쉽게 변경, 버튼 비활성화 기능 추가 등

#### 진행 과정

- ✅ Suggestions Page
- ✅ Detail Page
- ✅ Edit Page
- ✅ New Page
- ✅ Roadmap Page

## Refactoring 2차

Refactoring 기간 : 2026-07-03

#### 목표

- Form 입력 시 부모 Component의 Re-rendering 방지를 위해 Uncontrolled Components 패턴 도입
- Upvote, Comment 및 Feedback CRUD에 Optimistic UI 적용 및 Error 발생 시 자동 Rollback 구현
- Detail Page 진입 후 복귀 시 Category 및 Sort 필터 조건을 보존하도록 URL Query Parameter 유지 기능 구현
- Feedback 삭제 시 Status에 맞춰 Home 또는 Roadmap Page로 Smart Redirect 처리 및 History Stack 최적화
- Browser History가 없을 때 Go Back Button 작동을 보완하는 안전장치 구현
- Comment 입력 창에서 Enter Key로 Submit, Shift + Enter로 Newline 단축키 설정 및 Comment 등록 후 Smooth Scroll 추가
- Guest Login Page Design 고도화
- Header에 정적 G 대신 DB에 등록된 User의 Profile Image 연동
- Resolution 및 Responsive Layout CSS 구조 개선
- Hover 시 불필요한 React State 조작 제거 및 CSS Selector 기반 최적화
- Page Scroll 동작 시 Layout Shift 방지를 위한 스크롤 영역 고정
- Select Arrow Icon 회전 Motion 및 Transition Animation 개선
- Vercel을 통한 실시간 Build 및 Deployment 안정화

#### 진행 과정

- ✅ Form Optimization
- ✅ Optimistic UI
- ✅ URL Query Parameter
- ✅ Smart Redirect
- ✅ Keyboard Shortcuts & Smooth Scroll
- ✅ Login Page Design & Header Profile Image
- ✅ Resolution & Responsive Layout
- ✅ CSS Hover
- ✅ Layout Shift & Animation
- ✅ Vercel Deployment
