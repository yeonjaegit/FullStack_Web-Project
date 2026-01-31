package com.spring.main.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("http://localhost:5173");
	}

	// 추가적인 static 데이터에 접근하도록 설정을 변경하기 위한 override
	// uploads 폴더에 있는 이미지들을 접근할 수 있게 해주어야 함.
	// 엔드포인트를 "/images/..." 로 설정하여 요청하면 uploaders 폴더에 접근해서 가져갈 수 있도록 처리
	// 이 작업이 있어야 /images/엔드포인트로 uploads폴더 내 이미지들을 열람할 수 있음
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//			WebMvcConfigurer.super.addResourceHandlers(registry);

		// 절대 경로로 설정 (Windows와 Unix 모두 호환)
		String uploadsPath = System.getProperty("user.dir") + "/uploads/";
		System.out.println("Uploads path: " + uploadsPath);
		
		registry.addResourceHandler("/images/**") // 엔드포인트 하위 모든 경로 포함
				.addResourceLocations("file:" + uploadsPath);
	}
}
