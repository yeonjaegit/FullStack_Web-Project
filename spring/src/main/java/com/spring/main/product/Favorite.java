package com.spring.main.product;

import java.util.ArrayList;
import java.util.List;

import com.spring.main.member.Member;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="favorite")
@Entity
public class Favorite {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@OneToOne
	@JoinColumn(name = "memberid", unique=true, nullable=false)
	private Member member;

	@OneToMany(fetch=FetchType.EAGER)
	@JoinColumn(name="favoriteid")
	private List<Product> product = new ArrayList<>();
}
