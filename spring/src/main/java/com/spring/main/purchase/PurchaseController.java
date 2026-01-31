package com.spring.main.purchase;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PurchaseController {
	private final PurchaseService purchaseService;
	
    @GetMapping("/purchase/{id}")
    public ResponseEntity<Purchase> getOne(@PathVariable int id) {
        return ResponseEntity.ok(purchaseService.getById(id));
    }

    @GetMapping("/purchase/list")
    public ResponseEntity<List<Purchase>> getAll() {
        return ResponseEntity.ok(purchaseService.getAll());
    }

    @PutMapping("/purchase/{id}")
    public ResponseEntity<Purchase> update(@PathVariable int id, @RequestBody Purchase req) {
        return ResponseEntity.ok(purchaseService.update(id, req));
    }

    @DeleteMapping("/purchase/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        purchaseService.delete(id);
//        return ResponseEntity.noContent().build();
        return new ResponseEntity<String>("구매요청 삭제 완료", HttpStatus.OK);
    }
    
    @PostMapping("/purchase")
    public ResponseEntity<Purchase> create(@RequestBody Purchase purchase) {
        return ResponseEntity.ok(purchaseService.insert(purchase));
    }
}