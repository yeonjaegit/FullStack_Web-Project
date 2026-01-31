package com.spring.main.product;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/favorite")
    public ResponseEntity<?> postFavorite(@RequestBody Map<String, Integer> payload) {
        int productId = payload.get("productId");
        int memberId = payload.get("memberId");

        favoriteService.insertFavorite(memberId, productId);

        return ResponseEntity.ok("찜 완료!");
    }

    @GetMapping("/favorite")
    public ResponseEntity<List<ProductDTO>> getAllFavorite(@RequestParam int id) {
        List<ProductDTO> favorites = favoriteService.getAllFavoriteProducts(id);
        return ResponseEntity.ok(favorites);
    }
    
    @DeleteMapping("/favorite")
    public ResponseEntity<?> deleteCart(@RequestBody FavoriteDTO favorite) {
    	Favorite updateFavorite = favoriteService.deleteFavorite(favorite);
    	
    	Map<String, Object> map = new HashMap<>();
    	map.put("msg", "찜목록 삭제완료");
    	map.put("favorite", updateFavorite.getProduct());
    	
    	return new ResponseEntity<>(map, HttpStatus.OK);
    }
}
