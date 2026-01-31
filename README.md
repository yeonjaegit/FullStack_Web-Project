# ☕ FullStack Web-Project - 커피 전문 쇼핑몰

> Spring Boot + React 기반 커피 전문 온라인 쇼핑몰 플랫폼
> 
> 제품 판매, 장바구니, 결제, 커뮤니티 기능을 포함한 Full Stack 웹 애플리케이션

<br/>

## 📋 프로젝트 개요

커피 전문 온라인 쇼핑몰 웹사이트로, **Spring Boot 백엔드**와 **React 프론트엔드**를 하나의 레포지토리에서 관리하는 **Monorepo 구조**의 Full Stack 프로젝트입니다.

첫 프로젝트로서 **Spring Boot 3-Tier 아키텍처**(Controller-Service-Repository), **JPA 엔티티 매핑**, **JWT + OAuth2 통합 인증**, **Redux Toolkit 상태 관리** 등 백엔드와 프론트엔드의 전체적인 개발 흐름을 경험했습니다.

---

## 📊 핵심 성과

### 🏗️ 백엔드 설계
- **Spring Boot 3-Tier 구조**: Controller/Service/Repository 계층 분리
- **JPA Entity 설계**: Product, Cart, Purchase, Member 등 핵심 도메인 모델링
- **ERD 설계**: 12개 테이블 관계 매핑 (1:N, N:M)

### 🔐 인증/보안
- **JWT 커스텀 구현**: `io.jsonwebtoken` 라이브러리로 토큰 발급/검증 로직 직접 구현
- **OAuth2 통합**: Google, Kakao 소셜 로그인 Spring Security 연동
- **Spring Security 필터 체인**: `JwtFilter`로 요청 인증 처리

### 🎨 Full Stack 개발
- **Monorepo 관리**: 프론트-백엔드 코드 단일 레포지토리 관리 경험
- **Redux Toolkit**: 클라이언트 상태를 체계적으로 관리
- **Axios 인터셉터**: JWT 토큰 자동 주입 및 에러 핸들링

---

## 🚀 기술적 학습 포인트

### 1. Spring Boot 3-Tier 아키텍처 이해

**계층별 역할 분리**

```java
// Controller - HTTP 요청 처리
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService productService;
    
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return ResponseEntity.ok(products);
    }
}

// Service - 비즈니스 로직
@Service
public class ProductService {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}

// Repository - 데이터 접근
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
}
```

**학습 포인트**
- Controller는 HTTP 처리만, 비즈니스 로직은 Service에 위임
- `@Transactional` 어노테이션으로 트랜잭션 관리
- `JpaRepository` 상속으로 기본 CRUD 자동 제공

---

### 2. JWT + OAuth2 통합 인증 구현

**커스텀 JWT 서비스**

```java
// JwtService.java
@Service
public class JwtService {
    
    private final String SECRET_KEY = "your-secret-key";
    
    // JWT 토큰 생성
    public String generateToken(Long userId, String username, List<String> roles) {
        return Jwts.builder()
            .setSubject(username)
            .claim("id", userId)
            .claim("roles", roles)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24시간
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact();
    }
    
    // 토큰 검증
    public Claims validateToken(String token) {
        return Jwts.parser()
            .setSigningKey(SECRET_KEY)
            .parseClaimsJws(token)
            .getBody();
    }
}
```

**OAuth2 통합**

```java
// OAuth2UserDetailsServiceImpl.java
@Service
public class OAuth2UserDetailsServiceImpl implements OAuth2UserService {
    
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oauth2User = delegate.loadUser(userRequest);
        
        // Provider별 사용자 정보 추출
        String provider = userRequest.getClientRegistration().getRegistrationId();
        String email = oauth2User.getAttribute("email");
        String name = oauth2User.getAttribute("name");
        
        // DB에 사용자 저장 또는 조회
        Member member = memberRepository.findByEmail(email)
            .orElseGet(() -> {
                Member newMember = new Member(email, name, provider);
                return memberRepository.save(newMember);
            });
        
        // JWT 토큰 발급
        String jwtToken = jwtService.generateToken(member.getId(), member.getUsername());
        
        return new CustomOAuth2User(oauth2User, jwtToken);
    }
}
```

**학습 포인트**
- `io.jsonwebtoken` 라이브러리로 JWT 직접 구현
- OAuth2 Provider(Google/Kakao)별 사용자 정보 추출 로직
- Spring Security Filter Chain에 JWT 검증 필터 등록

---

### 3. JPA Entity 관계 매핑

**순환 참조 방지**

```java
// Product.java
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // 양방향 관계 설정
    @OneToMany(mappedBy = "product")
    @JsonManagedReference  // ← 순환 참조 방지
    private List<Cart> carts = new ArrayList<>();
}

// Cart.java
@Entity
public class Cart {
    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonBackReference  // ← Product → Cart → Product 무한 루프 차단
    private Product product;
}
```

**학습 포인트**
- `@OneToMany`, `@ManyToOne` 양방향 관계 설정
- `@JsonManagedReference`/`@JsonBackReference`로 JSON 직렬화 시 순환 참조 해결
- `mappedBy` 속성으로 관계의 주인(Owner) 지정

---

### 4. Redux Toolkit 상태 관리

**클라이언트 전역 상태**

```javascript
// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('jwt'),
    isAuthenticated: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('jwt', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('jwt');
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
```

**Axios 인터셉터로 JWT 자동 주입**

```javascript
// axios/axiosConfig.js
import axios from 'axios';
import store from '../redux/store';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

// 요청 인터셉터 - JWT 토큰 자동 추가
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 - 401 에러 시 자동 로그아웃
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 🏛️ 시스템 아키텍처

### ERD 설계

```
Member (1) ──< (N) Board
Member (1) ──< (N) Inquiry
Member (1) ──< (1) Cart
Member (1) ──< (1) Favorite
Member (1) ──< (N) Purchase

Product (1) ──< (N) Cart
Product (1) ──< (N) Purchase
Product (1) ──< (N) Discount

Board (1) ──< (N) Reply
Inquiry (1) ──< (N) Answer
```

**설계 특징**
- 회원-상품 간 다대다 관계를 Cart, Purchase로 중간 테이블화
- 커뮤니티 영역(Board, Inquiry)과 커머스 영역(Product, Purchase) 도메인 분리
- `@JsonManagedReference`로 양방향 관계 시 순환 참조 방지

---

### Monorepo 구조의 장점

**단일 레포지토리 통합 관리**
```
FullStack_Web-Project/
├── spring/              # Backend
│   ├── src/main/java/
│   └── build.gradle
└── react/               # Frontend
    └── team_front/
        ├── src/
        └── package.json
```

**장점**
- **코드 공유**: API 스펙 변경 시 프론트-백엔드 동시 수정 가능
- **버전 관리**: 단일 커밋으로 양쪽 코드 동기화
- **협업 효율**: 팀원 모두가 전체 코드베이스 접근 가능
- **배포 단순화**: 단일 CI/CD 파이프라인 구성 가능

---

## 💻 핵심 구현 코드

### Spring Security + JWT 필터

```java
// JwtFilter.java
@Component
public class JwtFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtService jwtService;
    
    @Override
    protected void doFilterInternal(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain filterChain
    ) throws ServletException, IOException {
        
        // Authorization 헤더에서 토큰 추출
        String token = extractToken(request);
        
        if (token != null && jwtService.validateToken(token)) {
            // 토큰에서 사용자 정보 추출
            Claims claims = jwtService.validateToken(token);
            String username = claims.getSubject();
            
            // SecurityContext에 인증 정보 설정
            UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        filterChain.doFilter(request, response);
    }
}
```

---

### React-Spring 통신 (Axios)

```javascript
// pages/ProductList.jsx
import { useEffect, useState } from 'react';
import api from '../axios/axiosConfig';

function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Spring Boot API 호출
    api.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('상품 조회 실패:', error);
      });
  }, []);
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 🤖 AI 도구 활용 (Cursor)

### JPA 연관관계 매핑 최적화
**Before (순환 참조 발생)**
```java
@Entity
public class Product {
    @OneToMany(mappedBy = "product")
    private List<Cart> carts;  // ← JSON 직렬화 시 무한 루프!
}
```

**After (Cursor 제안)**
```java
@Entity
public class Product {
    @OneToMany(mappedBy = "product")
    @JsonManagedReference  // ← Cursor가 제시
    private List<Cart> carts;
}
```

### Spring Security 설정 오류 해결
- `SecurityFilterChain` 빈 등록 오류 발생 시 Cursor가 정확한 설정 방법 제시
- JWT Filter 순서 문제 해결 (`addFilterBefore` 위치 자동 수정)

### React Hook 최적화
- `useEffect` 무한 루프 방지 (의존성 배열 자동 감지)
- Redux action dispatch 시점 최적화 제안

---

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

---

## 💡 배운 점 및 개선 과제

### 배운 점
- **Full Stack 개발**: 백엔드 API 설계부터 프론트엔드 연동까지 전 과정 체험
- **Spring Boot 아키텍처**: Controller-Service-Repository 3-Tier 구조 이해
- **JPA 기초**: Entity 매핑, Repository 패턴, 연관관계 설정 학습
- **React Hooks**: useState, useEffect를 활용한 상태 관리 경험
- **협업 도구**: Git 브랜치 전략 기반 팀 협업 및 코드 리뷰

### 향후 개선 과제
- **환경 변수 관리**: JWT Secret Key 하드코딩 제거 및 환경 변수화
- **API Rate Limiting**: 과도한 요청 방지 미들웨어 적용
- **캐싱 전략**: Redis 도입으로 상품 조회 API 성능 개선
- **테스트 코드**: JUnit, Mockito를 활용한 단위/통합 테스트 보강
- **API 문서화**: Swagger/OpenAPI 적용으로 API 명세 자동화

---

## 🔗 관련 링크

- **GitHub**: [FullStack_Web-Project](https://github.com/yeonjaegit/FullStack_Web-Project)
- **노션 포트폴리오**: [상세 프로젝트 문서](https://www.notion.so/Project-1-FullStack-Web-Project-2ee62d7f696c80c9a933c619deb645ab)

---

**Last Updated**: 2026-01-31

<br/>

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
