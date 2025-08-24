package com.example.ecommerce.service;

import com.example.ecommerce.dto.CartItemDTO;
import com.example.ecommerce.dto.CartResponseDTO;

import java.util.List;

public interface CartService {
    CartResponseDTO addToCart(Long userId, Long productId, Integer qty);
    List<CartItemDTO> getCart(Long userId);
    CartResponseDTO removeFromCart(Long userId, Long productId);
    void deleteItemFromCart(Integer userId, Integer productId);
}