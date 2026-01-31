package com.spring.main.product;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DiscountController {
	private final DiscountService discountService;

	@PostMapping("/discount")
	public ResponseEntity<?> postDiscount(Discount discount) {
		Discount _discount = discountService.insertDiscount(discount);
		if (_discount.getDiscountName() != null) {
			return new ResponseEntity<String>("할인정책 등록 완료", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("할인정책 등록 실패", HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/discount/list")
	public ResponseEntity<?> getDiscounts(
		@RequestParam(defaultValue = "active") String scope, // upcoming/expired/active
		@RequestParam(required = false) String tz // 생략 가능한 time zone 설정
	) {
		List<Discount> result;
		switch (scope.toLowerCase()) {
		case "upcoming":
			result = discountService.getUpcomingDiscounts(tz);
			break;
		case "expired":
			result = discountService.getExpiredDiscounts(tz);
			break;
		case "active":
		default:
			result = discountService.getActiveDiscounts(tz);
		}
		return new ResponseEntity<List<Discount>>(result, HttpStatus.OK);
	}

	@DeleteMapping("/discount/{id}")
	public ResponseEntity<?> deleteDiscount() {
		return new ResponseEntity<String>("할인정책 삭제 완료", HttpStatus.OK);
	}
}
