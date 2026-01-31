package com.spring.main.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepo extends JpaRepository<Favorite, Integer>{
	Favorite findByMemberId(int memberId);
}
