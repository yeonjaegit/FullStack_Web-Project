package com.spring.main.upload;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageFileService {
	private static String BASE_PATH="/uploads/";
	private static String BASE_URL="/images/";
	
	@Autowired
	private ImageFileRepo imageFileRepo;

	private final Path root = Path.of("uploads");
	
	public ImageFileService(ImageFileRepo imageFileRepo) {
		this.imageFileRepo = imageFileRepo;
		
		try {
            Files.createDirectories(this.root);
        } catch (Exception e) {
            throw new RuntimeException("업로드 폴더 생성 실패", e);
        }
		
	}
	
	@Transactional
	public ImageFile storeFile(MultipartFile file, String path){
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        try {
            if(fileName.contains("..")) {
                throw new RuntimeException("잘못된 파일명: " + fileName);
            }
            
            if (path.length()>0) {
            	if (path.equals("/")) {
            		throw new RuntimeException("path는 기본 경로일 수 없습니다.");
            	}
            	if (path.length()>1 && path.startsWith("/")) {
            		throw new RuntimeException("path는 '/'로 시작할 수 없습니다.");
            	}
            	if (!path.endsWith("/")) {
            		throw new RuntimeException("path는 반드시 '/'로 끝나야 합니다.");
            	}
            }
            
            Path targetLocation = this.root.resolve(path).resolve(fileName);
            Files.createDirectories(targetLocation.getParent());
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            
            String clean=StringUtils.getFilename(file.getOriginalFilename());
            int i=clean.lastIndexOf(".");
            String ex=(i>=0)?clean.substring(i+1).toLowerCase():"";
            String uuid=UUID.randomUUID()+"."+ex;
            
            // DB에 저장
            ImageFile imageFile = ImageFile.builder()
                    .fileName(fileName)
                    .filePath(BASE_PATH+path+fileName)
                    .uuid(uuid)
                    .url(BASE_URL+path+fileName)
                    .build();

            return imageFileRepo.save(imageFile);

        } catch (Exception e) {
            throw new RuntimeException("파일 저장 실패: " + fileName, e);
        }
    }
	
	public List<ImageFile> storeFiles(List<MultipartFile> files, String path) {
        List<ImageFile> savedFiles = new ArrayList<>();
        for (MultipartFile file : files) {
            ImageFile saved = storeFile(file, path); // 기존 메서드 활용
            savedFiles.add(saved);
        }
        return savedFiles;
    }
	
	public ImageFile getImage(int id) {
		return imageFileRepo.findById(id).orElseGet(() -> new ImageFile());
	}
	
	public ImageFile getImage(String url) {
		return imageFileRepo.findByUrl(url).orElseGet(() -> new ImageFile());
	}
	
	public List<ImageFile> getAllImages() {
		return imageFileRepo.findAll();
	}
	
	public List<ImageFile> getImagesByFileNameContaining(String fileName) {
		return imageFileRepo.findByFileNameContaining(fileName);
	}
	
	public List<ImageFile> getImagesByUuid(String uuid) {
		return imageFileRepo.findAllByUuid(uuid);
	}
	
	public ImageFile deleteImage(int id) {
		ImageFile deletedImage=imageFileRepo.findById(id).orElseThrow();
		imageFileRepo.deleteById(id);
		return deletedImage;
	}
	
	
	
	
	
	
	
	
	
	
}
