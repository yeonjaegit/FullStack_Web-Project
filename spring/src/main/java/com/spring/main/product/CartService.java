package com.spring.main.product;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.main.member.Member;

@Service
public class CartService {
	
	@Autowired
	private CartRepo cartRepo;
  
	public void insertCart(Map<String, Integer> data) {
		
		Integer memberId = data.get("memberId");
		Integer productId = data.get("productId");
		
		Member member = new Member();
		member.setId(memberId);
		
		Product product = new Product();
		product.setId(productId);
		
		
		Cart cart = cartRepo.findByMemberId(memberId);
		
		if(cart == null) {
			cart = new Cart();
			cart.setMember(member);
			cart.setProductList(new ArrayList<>());
		}
		
                // Cart's product list may contain full Product entities, while the
                // newly created product above only has an id. Using `contains`
                // would compare all fields (because Lombok's @Data generates an
                // equals method using every field), causing a product with the
                // same id but different other fields to be considered different
                // and inserted multiple times. Instead, ensure uniqueness based
                // solely on the product id.
                boolean exists = cart.getProductList().stream()
                                .anyMatch(p -> p.getId() == productId);
                if (!exists) {
                        cart.getProductList().add(product);
                }
		
		
		cartRepo.save(cart);
		
	}
	
	public Cart deleteCart(CartDTO data) {
		Cart cart = cartRepo.findByMemberId(data.getMemberId());
		
		List<Product> deleteProduct = new ArrayList<>();
		
		for(Product p : cart.getProductList()) {
			if(data.getProductId().contains(p.getId()))
				deleteProduct.add(p);
		}
		
		cart.getProductList().removeAll(deleteProduct);
		
		cartRepo.save(cart);
	
		
		return cart;
	}
	
}
