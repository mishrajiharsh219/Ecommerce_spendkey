package com.example.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDTO {
    private String message;           // success or error message
    private String productName;
    private Integer quantity;
    private Double price;
    private Double totalPrice;
}
