package com.example.ecommerce.controller;

import com.example.ecommerce.dto.ProductDTO;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.service.RelatedProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "*")
public class RelatedProductController {

    @Autowired
    public RelatedProductService relatedProductService;

    @GetMapping("/{id}/related")
    public ResponseEntity<?> getRelatedProducts(@PathVariable Long id) {
        try {
            List<Product> products = relatedProductService.getRelatedProducts(id);

            List<ProductDTO> productDTOs = products.stream()
                    .map(p -> new ProductDTO(p.getId(), p.getName(), p.getPrice(), p.getAvailabilityQty(),
                            p.getMainImageUrl()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(productDTOs);
        } catch (RuntimeException ex) {
            return ResponseEntity.status( HttpStatus.NOT_FOUND)
                    .body("Error fetching related products: " + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong: " + ex.getMessage());
        }
    }
}
