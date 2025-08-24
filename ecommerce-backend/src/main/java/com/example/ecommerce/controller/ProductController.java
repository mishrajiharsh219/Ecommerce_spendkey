package com.example.ecommerce.controller;

import com.example.ecommerce.dto.ProductDTO;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<?> getProductsByCategory(@RequestParam Long categoryId) {
        try {
            List<Product> products = productService.getProductsByCategory(categoryId);

            List<ProductDTO> productDTOs = products.stream()
                    .map(p -> new ProductDTO(p.getId(), p.getName(), p.getPrice(), p.getAvailabilityQty(),p.getMainImageUrl()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(productDTOs);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error fetching products: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong: " + ex.getMessage());
        }
    }
    @GetMapping("/allProducts")
    public ResponseEntity<?> getAllProducts() {
        try {
            List<Product> products = productService.getAllProducts();

            List<ProductDTO> productDTOs = products.stream()
                    .map(p -> new ProductDTO(p.getId(), p.getName(), p.getPrice(), p.getAvailabilityQty(),p.getMainImageUrl()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(productDTOs);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error fetching products: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong: " + ex.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id)
    {
        try {
            Product products = productService.getProductById(id);
            return ResponseEntity.ok(new ProductDTO(products.getId(), products.getName(),
                    products.getPrice(), products.getAvailabilityQty(),products.getMainImageUrl()));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Error fetching products: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong: " + ex.getMessage());
        }
    }
}
