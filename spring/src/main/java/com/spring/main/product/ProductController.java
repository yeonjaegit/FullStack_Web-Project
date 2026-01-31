package com.spring.main.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

	@Autowired
    private  ProductService productService;
	
	@GetMapping("/product/list") // 상품 목록 조회
	public ResponseEntity<?> selectAllProduct() {
		
		List<Product> product = productService.selectAllProduct();
		
		return new ResponseEntity<>(product, HttpStatus.OK);
	} // 리턴 바디에 List<Product> 넣어야 함
	
	@PostMapping("/product") // 상품 추가
	public ResponseEntity<?> addProduct(@RequestBody Product product) {
		
		productService.insertProduct(product);
		
		return new ResponseEntity<>("상품 추가 완료", HttpStatus.OK);
	}
	
	@PutMapping("/product/{id}") // 상품 수정
	public ResponseEntity<?> putProduct(@PathVariable int id, @RequestBody Product product) {
		
		productService.updateProduct(id, product);
		
		return new ResponseEntity<>("상품 수정 완료", HttpStatus.OK);
	}
	
	@GetMapping("/product/{id}") // 상품 조회(디테일)
	public ResponseEntity<?> getProduct(@PathVariable int id) {
		
		Product product=productService.get(id);
//		Product _product=Product.builder()
//				.id(product.getId())
//				.productName(product.getProductName())
//				.price(product.getPrice())
//				.imageUrl(product.getImageUrl())
//				.content(product.getContent())
//				.category(product.getCategory())
//				.discount(product.getDiscount())???
		
		return new ResponseEntity<>(product, HttpStatus.OK);
	}
	
	@DeleteMapping("/product/{id}") // 상품 삭제
	public ResponseEntity<?> deleteProduct(@PathVariable int id) {
		
		productService.deleteProduct(id);
		
		return new ResponseEntity<>("상품 삭제 완료", HttpStatus.OK);
	}
	
	/**
	 * 요청방법: /product?category=???
	 * @param category
	 * @return
	 */
	@GetMapping("/product")
	public ResponseEntity<?> findProductByCategory(@RequestParam String category){
		System.out.println("========================================");
		System.out.println("Searching for category: [" + category + "]");
		
		List<Product> listProducts=productService.findAllByCategory(category);
		
		System.out.println("Found " + listProducts.size() + " products");
		if (listProducts.size() > 0) {
			System.out.println("First product: " + listProducts.get(0).getProductName());
		}
		System.out.println("========================================");
		
		return new ResponseEntity<List<Product>>(listProducts, HttpStatus.OK);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
