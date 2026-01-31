# ☕ FullStack Web-Project - 커피 전문 쇼핑몰

> Spring Boot + React 기반 커피 전문 온라인 쇼핑몰 플랫폼
> 
> 제품 판매, 장바구니, 결제, 커뮤니티 기능을 포함한 Full Stack 웹 애플리케이션

<br/>

## 📋 프로젝트 개요

커피 전문 온라인 쇼핑몰 웹사이트로, Spring Boot 백엔드와 React 프론트엔드를 하나의 레포지토리에서 관리하는 Monorepo 구조의 Full Stack 프로젝트입니다. 상품 관리, 장바구니, 주문/결제, 회원 관리, 커뮤니티 기능을 포함하고 있습니다.

<br/>

## 🛠 기술 스택

### Backend (Spring)
- **Language:** Java 21
- **Framework:** Spring Boot 3.5.5
- **ORM:** Spring Data JPA
- **Security:** Spring Security, OAuth2, JWT
- **Database:** MySQL
- **Build Tool:** Gradle

### Frontend (React)
- **Language:** JavaScript (ES6+)
- **Framework:** React 18.3
- **Build Tool:** Vite 7.1
- **State Management:** Redux Toolkit
- **Styling:** Bootstrap 5, React-Bootstrap
- **HTTP Client:** Axios
- **Routing:** React Router DOM

<br/>

## 📁 프로젝트 구조

```
team-test/
├── spring/              # Spring Boot 백엔드
│   ├── src/
│   │   ├── main/
│   │   │   └── java/
│   │   └── test/
│   ├── build.gradle
│   └── uploads/         # 파일 업로드 디렉토리
│
└── react/               # React 프론트엔드
    └── team_front/
        ├── src/
        │   ├── components/  # 재사용 가능한 컴포넌트
        │   ├── pages/       # 페이지 컴포넌트
        │   ├── redux/       # Redux 상태 관리
        │   └── axios/       # API 통신 설정
        ├── public/
        └── package.json
```

<br/>

## ⚙️ 주요 기능

### 상품 관리
- 커피 제품 등록, 수정, 삭제
- 카테고리별 제품 분류 (예: 에스프레소, 라떼, 아메리카노 등)
- 상품 상세 정보 및 이미지 관리
- 할인 이벤트 적용

### 장바구니 & 관심상품
- 장바구니 추가/삭제/수량 조정
- 관심상품 (즐겨찾기) 기능
- 장바구니에서 바로 결제 연결

### 주문 & 결제
- 주문 내역 관리
- 결제 상태 추적 (OrderStatus)
- 결제 방법 선택 (MethodType)

### 인증 & 보안
- JWT 기반 사용자 인증
- OAuth2 소셜 로그인 (Google, Kakao)
- Spring Security를 활용한 권한 관리

### 커뮤니티
- 게시판 (Board) - 공지사항, 리뷰, 자유게시판
- 문의 시스템 (Inquiry) - 1:1 문의, FAQ
- 댓글 (Answer/Reply) 기능

### 상태 관리
- Redux Toolkit을 활용한 전역 상태 관리
- JWT 토큰 관리 및 자동 갱신

### UI/UX
- Bootstrap 기반 반응형 디자인
- React-Quill 에디터 통합
- Kakao Maps API 연동 (매장 위치 표시)

<br/>

## 🚀 실행 방법

### Backend 실행

```bash
cd spring
./gradlew bootRun
```

### Frontend 실행

```bash
cd react/team_front
npm install
npm run dev
```

<br/>

## 👥 팀 구성

이 프로젝트는 팀 단위로 협업하여 진행되었으며, 하나의 레포지토리에서 프론트엔드와 백엔드를 함께 관리하는 경험을 통해 협업 능력과 풀스택 개발 역량을 키웠습니다.

<br/>

## � 기술적 특징

- **Monorepo 구조**: 프론트엔드와 백엔드를 하나의 레포지토리에서 통합 관리
- **인증/인가**: JWT + OAuth2를 활용한 보안 처리 및 Spring Security 적용
- **데이터 관리**: JPA/Hibernate를 통한 ORM 기반 데이터베이스 설계
- **상태 관리**: Redux Toolkit으로 클라이언트 상태를 체계적으로 관리
- **모듈화**: 커뮤니티, 상품, 구매, 회원 등 기능별 모듈 분리
- **RESTful API**: 표준 REST API 설계 및 구현

<br/>

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
