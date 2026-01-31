package com.spring.main.product;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountRepo extends JpaRepository<Discount, Integer>{
	//now가 [startAt, expireAt] 사이에서 주어지면 진행중인 discount로 간주하여 조회함. 
    List<Discount> findByStartAtLessThanEqualAndExpireAtGreaterThanEqual(LocalDateTime startAt, LocalDateTime expireAt);
//    @Query("select d from Discount d where d.startAt <= :now and d.expireAt >= :now")
//    List<Discount> findActive(@Param("now") LocalDateTime now);

 // now 기준 예정된 discount
    List<Discount> findByStartAtAfter(LocalDateTime now); 
 // now 기준 만료된 discount
    List<Discount> findByExpireAtBefore(LocalDateTime now); 
}
