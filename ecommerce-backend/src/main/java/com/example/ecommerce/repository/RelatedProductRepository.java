package com.example.ecommerce.repository;

import com.example.ecommerce.entity.RelatedProduct;
import com.example.ecommerce.entity.RelatedProductId;
import com.example.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface RelatedProductRepository extends JpaRepository<RelatedProduct, RelatedProductId> {
    List<RelatedProduct> findByProduct(Product product);
}
