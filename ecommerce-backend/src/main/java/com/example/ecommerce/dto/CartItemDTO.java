package com.example.ecommerce.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
    private String productName;
    private Integer quantity;
    private Double unitPrice;
    private Double totalPrice;
    private Long productId;
    private String mainImageUrl;
}
