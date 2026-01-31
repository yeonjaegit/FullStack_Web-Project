package com.spring.main.product;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="discount")
@Entity
public class Discount {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable=false)
	private String discountName;

	@Column(nullable=false)
	private Double rate;
	
	@Column(nullable=false)
	private LocalDateTime startAt;
	
	@Column(nullable=false)
	private LocalDateTime expireAt;
	
	@JsonManagedReference
	@OneToMany(mappedBy="discount", fetch=FetchType.EAGER)
	@ToString.Exclude
	private List<Product> productList;
}
