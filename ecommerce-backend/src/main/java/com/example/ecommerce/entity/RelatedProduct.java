package com.example.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "related_product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelatedProduct {

    @EmbeddedId
    private RelatedProductId id;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne
    @MapsId("relatedProductId")
    @JoinColumn(name = "related_product_id")
    private Product relatedProduct;
}
