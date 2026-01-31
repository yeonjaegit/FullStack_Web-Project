package com.spring.main;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.spring.main.product.Cart;
import com.spring.main.product.CartRepo;
import com.spring.main.product.Product;

@SpringBootTest
class ApplicationTests {

	@Autowired
	private CartRepo cartRepo;

	@Test
	void contextLoads() {

		List<Integer> deleteId = new ArrayList<>();
		deleteId.add(2);
		deleteId.add(41);

		Cart cart = cartRepo.findByMemberId(1);
		
		System.out.println("========삭제전 목록=========");
		for (Product p : cart.getProductList()) {
			System.out.println(p);
		}
		System.out.println("=================");

		System.out.println("========삭제할 id들=========");
		System.out.println(deleteId);
		System.out.println("=================");

		List<Product> list = new ArrayList<>();
		
		for (Product p : cart.getProductList()) {
			if (deleteId.contains(p.getId()))
				list.add(p);
		}
		
		cart.getProductList().removeAll(list);

		System.out.println("=================");

		for (Product p : cart.getProductList()) {
			System.out.println(p);
		}

	}

}
