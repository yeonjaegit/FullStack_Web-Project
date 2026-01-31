package com.spring.main.product;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiscountService {
	private final DiscountRepo discountRepo;
	
	public Discount insertDiscount(Discount discount) {
		return discountRepo.save(discount);
	}
	
	// time zone (tz) 기준으로 처리
    public List<Discount> getActiveDiscounts(@Nullable String tz) {
        ZoneId zoneId = (tz != null && !tz.isBlank()) ? ZoneId.of(tz) : ZoneId.of("Asia/Seoul");
        LocalDateTime now = LocalDateTime.now(zoneId);
        return discountRepo.findByStartAtLessThanEqualAndExpireAtGreaterThanEqual(now, now);
//        return discountRepo.findActive(now); 
    }
    
    //예정된 discount 조회
    public List<Discount> getUpcomingDiscounts(@Nullable String tz) {
        ZoneId zoneId = (tz != null && !tz.isBlank()) ? ZoneId.of(tz) : ZoneId.of("Asia/Seoul");
        LocalDateTime now = LocalDateTime.now(zoneId);
        return discountRepo.findByStartAtAfter(now);
    }

    //만기된 discount 조회
    public List<Discount> getExpiredDiscounts(@Nullable String tz) {
        ZoneId zoneId = (tz != null && !tz.isBlank()) ? ZoneId.of(tz) : ZoneId.of("Asia/Seoul");
        LocalDateTime now = LocalDateTime.now(zoneId);
        return discountRepo.findByExpireAtBefore(now);
    }
}
