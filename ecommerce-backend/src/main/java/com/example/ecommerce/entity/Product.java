package com.example.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    @Column(name = "availability_qty")
    private Integer availabilityQty;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // Main product image URL
    @Column(name = "main_image_url", length = 500)
    private String mainImageUrl;
}
