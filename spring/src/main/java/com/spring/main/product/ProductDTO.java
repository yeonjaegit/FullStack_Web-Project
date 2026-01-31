package com.spring.main.product;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductDTO {
    private int id;
    private String productName;
    private String price;
    private String category; // 필요하다면 추가
}