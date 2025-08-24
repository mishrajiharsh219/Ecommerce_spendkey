package com.example.ecommerce.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelatedProductId implements Serializable {
    private Long productId;
    private Long relatedProductId;
}
