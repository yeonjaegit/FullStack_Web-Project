package com.spring.main.product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

	@Autowired
	private ProductRepo productRepo;
	
	public Product get(int id) {
		return productRepo.findById(id).get();
	}
	
	public void insertProduct(Product product) {
		productRepo.save(product);
	}
	
	public List<Product> selectAllProduct() {
		List<Product> product = productRepo.findAll();
		
		return product;
	}
	
	public void updateProduct(int id, Product product) {
		 Product updateProduct = productRepo.findById(id).get();
		 updateProduct.setProductName(product.getProductName());
		 updateProduct.setCategory(product.getCategory());
		 updateProduct.setPrice(product.getPrice());
		 updateProduct.setContent(product.getContent());
		 
		 productRepo.save(updateProduct);
	}
	
	public void deleteProduct(int id) {
		productRepo.deleteById(id);
	}
	
	public List<Product> findAllByCategory(String category) {
		List<Product> listProducts=productRepo.findByCategoryContaining(category);
		return listProducts;
	}
	
}
