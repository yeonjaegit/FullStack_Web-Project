package com.spring.main.upload;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageFileRepo extends JpaRepository<ImageFile, Integer>{
	List<ImageFile> findByFileNameContaining(String fileName);
	List<ImageFile> findAllByUuid(String uuid);
	Optional<ImageFile> findByUrl(String url);
}
