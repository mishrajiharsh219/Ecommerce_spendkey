package com.example.ecommerce.service;

import com.example.ecommerce.entity.Category;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.CategoryRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    public ProductRepository productRepo;
    @Autowired
    public CategoryRepository categoryRepo;



    @Override
    public List<Product> getProductsByCategory(Long categoryId) {
        Category category = categoryRepo.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        List<Product> products = new ArrayList<>();
        collectProducts(category, products);
        return products;
    }

    private void collectProducts(Category category, List<Product> products) {
        products.addAll(productRepo.findByCategory(category));
        if (category.getChildren() != null) {
            for (Category child : category.getChildren()) {
                collectProducts(child, products);
            }
        }
    }


    public List<Product> getAllProducts()
    {
        return productRepo.findAll();
    }

    public Product getProductById(Long productId) {
        return productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}
