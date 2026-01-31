package com.spring.main.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer>{

	List<Product> findByOrderByPriceDesc();
	List<Product> findByOrderByPriceAsc();
	List<Product> findByOrderByProductName();
	List<Product> findByOrderByCategory();
	List<Product> findByCategory(String category);
	List<Product> findByCategoryLike(String category); 
	List<Product> findByCategoryEndingWith(String category); // %category
	List<Product> findByCategoryStartingWith(String category); // category%
	List<Product> findByCategoryContaining(String category); // %category%
	
}
