package com.spring.main.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.spring.main.product.Product;
import com.spring.main.product.ProductRepo;

@Configuration
public class DataInitializer {

	@Bean
	CommandLineRunner initDatabase(ProductRepo productRepo) {
		return args -> {
			// 기존 데이터 삭제
			System.out.println("========================================");
			System.out.println("Deleting all existing products...");
			productRepo.deleteAll();
			System.out.println("Starting database initialization...");
			System.out.println("========================================");

			// === 에스프레소 카테고리 ===
			productRepo.save(createProduct("아메리카노", "에스프레소", "4,500원", "/images/coffee/americano.png", 
				"에스프레소에 물을 더해 깔끔하고 산뜻한 맛이 특징입니다."));
			
			productRepo.save(createProduct("카페라떼", "에스프레소,카페라떼", "5,000원", "/images/coffee/cafelatte.png", 
				"에스프레소에 우유를 넣어 부드럽고 고소한 맛이 일품입니다."));
			
			productRepo.save(createProduct("카푸치노", "에스프레소,카푸치노", "5,000원", "/images/coffee/cappuccino.png", 
				"풍부한 우유 거품과 에스프레소의 조화가 돋보이는 메뉴입니다."));
			
			productRepo.save(createProduct("카라멜 마키아또", "에스프레소,마키아토", "5,500원", "/images/coffee/caramelmacchiato.png", 
				"달콤한 카라멜 소스와 부드러운 우유가 조화로운 메뉴입니다."));
			
			productRepo.save(createProduct("에스프레소", "에스프레소", "4,000원", "/images/coffee/espresso.png", 
				"커피 원액 그대로의 진하고 강렬한 풍미를 느낄 수 있습니다."));
			
			productRepo.save(createProduct("에스프레소 마키아또", "에스프레소,마키아토", "4,500원", "/images/coffee/espresso makiato.png", 
				"에스프레소에 우유 거품을 살짝 얹어 부드러움을 더했습니다."));
			
			productRepo.save(createProduct("카페모카", "에스프레소,카페모카", "5,500원", "/images/coffee/creammocha.png", 
				"초콜릿과 에스프레소, 우유가 어우러져 달콤하게 즐길 수 있습니다."));
			
			productRepo.save(createProduct("아포가토", "에스프레소", "6,000원", "/images/coffee/Affogato.png", 
				"차가운 아이스크림에 뜨거운 에스프레소를 부어 즐기는 메뉴입니다."));
			
			productRepo.save(createProduct("에스프레소 초콜릿", "에스프레소", "5,500원", "/images/coffee/espresso chocolate.png", 
				"진한 에스프레소와 달콤한 초콜릿의 조화"));
			
			productRepo.save(createProduct("에스프레소 크림 브륄레", "에스프레소", "6,500원", "/images/coffee/espresso Cream Brulle.png", 
				"에스프레소와 크림 브륄레가 만난 특별한 디저트 커피"));
			
			productRepo.save(createProduct("크림 라떼", "에스프레소,카페라떼", "5,800원", "/images/coffee/creamLatte.png", 
				"부드러운 크림이 가득한 프리미엄 라떼"));
			
			productRepo.save(createProduct("헤이즐넛 밀크 폼", "에스프레소", "5,800원", "/images/coffee/hazelnut Milk Foam.png", 
				"고소한 헤이즐넛과 부드러운 밀크 폼의 조화"));
			
			productRepo.save(createProduct("카페 비엔나", "에스프레소", "5,500원", "/images/coffee/cafevienna.png", 
				"진한 커피 위에 풍성한 휘핑크림을 올린 비엔나 스타일"));

			// === 브루잉 카테고리 ===
			productRepo.save(createProduct("콜드브루", "브루잉,콜드브루", "5,000원", "/images/coffee/cold Brew.png", 
				"차가운 물로 오랜 시간 추출하여 부드럽고 깔끔한 맛이 특징입니다."));
			
			productRepo.save(createProduct("콜드브루 라떼", "브루잉,콜드브루", "5,500원", "/images/coffee/coldbrewLatte.png", 
				"깔끔한 콜드브루에 우유를 더해 부드러움을 극대화했습니다."));
			
			productRepo.save(createProduct("더치 크림", "브루잉", "6,000원", "/images/coffee/dutchCream.png", 
				"더치커피에 부드러운 크림을 올린 프리미엄 음료"));

			// === 블렌디드 카테고리 ===
			productRepo.save(createProduct("섬머 라떼", "블렌디드,블렌디드커피", "6,000원", "/images/coffee/summerlatte.png", 
				"여름 한정 시원하고 상큼한 라떼"));
			
			productRepo.save(createProduct("와일드 크림", "블렌디드,블렌디드커피", "6,500원", "/images/coffee/wild cream.png", 
				"풍부한 크림과 특별한 풍미의 시그니처 커피"));
			
			productRepo.save(createProduct("8090 다방커피", "블렌디드,아인슈페너", "4,500원", "/images/coffee/8090 Dabang coffee.png", 
				"추억의 맛을 재현한 레트로 다방 커피"));

			System.out.println("========================================");
			System.out.println("Database initialized with " + productRepo.count() + " products!");
			System.out.println("Categories in DB:");
			productRepo.findAll().forEach(p -> System.out.println("  - " + p.getProductName() + ": " + p.getCategory()));
			System.out.println("========================================");
		};
	}

	private Product createProduct(String name, String category, String price, String imageUrl, String content) {
		Product product = new Product();
		product.setProductName(name);
		product.setCategory(category);
		product.setPrice(price);
		product.setImageUrl(imageUrl);
		product.setContent(content);
		return product;
	}
}
