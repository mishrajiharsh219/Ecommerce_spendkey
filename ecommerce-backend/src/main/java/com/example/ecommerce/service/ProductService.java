package com.example.ecommerce.service;

import com.example.ecommerce.entity.Product;
import java.util.List;

public interface ProductService {
    List<Product> getProductsByCategory(Long categoryId);
    List<Product> getAllProducts();
    Product getProductById(Long productId);
}
