package com.example.ecommerce.service;

import com.example.ecommerce.dto.CategoryDto;
import java.util.List;

public interface CategoryService {
    List<CategoryDto> getCategoryTree();
}
