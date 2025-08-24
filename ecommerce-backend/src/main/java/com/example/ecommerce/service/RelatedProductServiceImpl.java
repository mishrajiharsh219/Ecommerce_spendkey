package com.example.ecommerce.service;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.RelatedProduct;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.RelatedProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RelatedProductServiceImpl implements RelatedProductService {
    @Autowired
    public RelatedProductRepository relatedRepo;
    @Autowired
    public ProductRepository productRepo;


    @Override
    public List<Product> getRelatedProducts(Long productId) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        return relatedRepo.findByProduct(product).stream()
                .map(RelatedProduct::getRelatedProduct)
                .collect(Collectors.toList());
    }
}
