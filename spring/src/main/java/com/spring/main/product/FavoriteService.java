package com.spring.main.product;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.main.member.Member;
import com.spring.main.member.MemberRepo;

@Service
public class FavoriteService {

    @Autowired
    private MemberRepo memberRepo;

    @Autowired
    private FavoriteRepo favoriteRepo;

    @Autowired
    private ProductRepo productRepo;

    // 찜 추가
    @Transactional
    public void insertFavorite(int memberId, int productId) {
        Member member = memberRepo.findById(memberId)
                .orElseThrow(() -> new RuntimeException("회원 없음"));
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("상품 없음"));

        Favorite favorite = favoriteRepo.findByMemberId(memberId);

        if (favorite == null) {
            favorite = new Favorite();
            favorite.setMember(member);
        }

        if (!favorite.getProduct().contains(product)) {
            favorite.getProduct().add(product);
        }

        favoriteRepo.save(favorite);
    }

    // 로그인한 회원의 찜 목록 조회 (DTO 변환)
    @Transactional(readOnly = true)
    public List<ProductDTO> getAllFavoriteProducts(int memberId) {
        Favorite favorite = favoriteRepo.findByMemberId(memberId);

        if (favorite == null) {
            return new ArrayList<>();
        }

        return favorite.getProduct().stream()
                .map(p -> new ProductDTO(
                        p.getId(),
                        p.getProductName(),
                        p.getPrice(),
                        p.getCategory()
                ))
                .collect(Collectors.toList());
    }
    
    public Favorite deleteFavorite(FavoriteDTO data) {
    	Favorite favorite = favoriteRepo.findByMemberId(data.getMemberId());
    	
    	List<Product> deleteProduct = new ArrayList<>();
    	
    	for(Product p : favorite.getProduct()) {
    		if(data.getProductId().contains(p.getId()))
    			deleteProduct.add(p);
    	}
    	favorite.getProduct().removeAll(deleteProduct);
    	
    	favoriteRepo.save(favorite);
    	
    	return favorite;
    }
}
