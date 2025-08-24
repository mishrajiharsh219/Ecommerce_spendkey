package com.example.ecommerce.service;
import com.example.ecommerce.dto.CategoryDto;
import com.example.ecommerce.entity.Category;
import com.example.ecommerce.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    public  CategoryRepository categoryRepo;

    @Override
    public List<CategoryDto> getCategoryTree() {
        List<Category> roots = categoryRepo.findByParentIsNull();
        return roots.stream().map(this::mapToDto).toList();
    }

    private CategoryDto mapToDto(Category category) {
        CategoryDto dto = new CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setChildren(category.getChildren().stream()
                .map(this::mapToDto)
                .toList());
        return dto;
    }
}
