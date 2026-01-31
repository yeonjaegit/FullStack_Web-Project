package com.spring.main.purchase;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PurchaseService {
	private final PurchaseRepo purchaseRepo;

    public Purchase getById(int id) {
        return purchaseRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public List<Purchase> getAll() {
        return purchaseRepo.findAll();
    }

    public Purchase insert(Purchase purchase) {
        return purchaseRepo.save(purchase);
    }
    
    @Transactional
    public Purchase update(int id, Purchase req) {
        Purchase p = purchaseRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        p.setTotalAmount(req.getTotalAmount());
        p.setStatus(req.getStatus());
        p.setMethod(req.getMethod());
        p.setPaymentInfo(req.getPaymentInfo());
        p.setMember(req.getMember());
        return p;
    }

    @Transactional
    public void delete(int id) {
        if (!purchaseRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        purchaseRepo.deleteById(id);
    }
}