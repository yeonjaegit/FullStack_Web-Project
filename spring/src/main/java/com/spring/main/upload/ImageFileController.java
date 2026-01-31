package com.spring.main.upload;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ImageFileController {
	private final ImageFileService imageFileService;
	
	@PostMapping("/images")
	public ResponseEntity<?> uploadMultiImage(@RequestPart List<MultipartFile> files, @RequestParam String path) {
		List<ImageFile> uploadedImageFiles=imageFileService.storeFiles(files, path);
		String msg="이미지 저장 완료\n";
		for (ImageFile imageFile:uploadedImageFiles) {
			msg+="filename:"+imageFile.getFileName()+" url:"+imageFile.getUrl()+"\n";
		}
		return new ResponseEntity<String>(msg, HttpStatus.OK);
	}
	
	@GetMapping("/images/{id}")
	public ResponseEntity<?> getImage(@PathVariable int id) {
		return new ResponseEntity<ImageFile>(imageFileService.getImage(id), HttpStatus.OK);				
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/images/all")
	public ResponseEntity<?> getAllImages() {
		return new ResponseEntity<List<ImageFile>>(imageFileService.getAllImages(), HttpStatus.OK);
	}
	
	@GetMapping("/images/url")
	public ResponseEntity<?> getImagesByUrl(@RequestParam String url){
		return new ResponseEntity<ImageFile>(imageFileService.getImage(url), HttpStatus.OK);
	}
	
	@GetMapping("/images")
	public ResponseEntity<?> getImagesByFileNameContaining(@RequestParam String fileName){
		return new ResponseEntity<List<ImageFile>>(imageFileService.getImagesByFileNameContaining(fileName), HttpStatus.OK);
	}	
	
	@GetMapping("/images/uuid")
	public ResponseEntity<?> getImagesByUuid(@RequestParam String uuid){
		return new ResponseEntity<List<ImageFile>>(imageFileService.getImagesByUuid(uuid), HttpStatus.OK);
	}
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/images/{id}")
	public ResponseEntity<?> deleteImage(@PathVariable int id){
		ImageFile deletedImage=imageFileService.deleteImage(id);
		return new ResponseEntity<ImageFile>(deletedImage, HttpStatus.OK);
	}
	
	
}
