package com.example.ecommerce.service;

import com.example.ecommerce.entity.Product;
import java.util.List;

public interface RelatedProductService {
    List<Product> getRelatedProducts(Long productId);
}
