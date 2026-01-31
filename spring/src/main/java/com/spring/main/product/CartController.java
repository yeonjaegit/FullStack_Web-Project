package com.spring.main.product;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CartController {
	private final CartService cartService;
	private final CartRepo cartRepo;

	@PostMapping("/cart")
	public void addCart(@RequestBody Map<String, Integer> cart) {
		cartService.insertCart(cart);
	}
	
	@GetMapping("/cart")
	public ResponseEntity<?> getCart(@RequestParam int id) {
		Cart cart = cartRepo.findByMemberId(id);
		List<Product> list = cart.getProductList();
		
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@DeleteMapping("/cart")
	public ResponseEntity<?> deleteCart(@RequestBody CartDTO cart) {
		
		Cart updateCart = cartService.deleteCart(cart);
		
		Map<String, Object> map = new HashMap<>();
		map.put("msg", "장바구니 삭제 완료");
		map.put("cart", updateCart.getProductList());
		
		return new ResponseEntity<>(map, HttpStatus.OK);
	}
}
