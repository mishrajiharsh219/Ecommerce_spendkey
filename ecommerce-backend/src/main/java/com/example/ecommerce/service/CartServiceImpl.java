package com.example.ecommerce.service;


import com.example.ecommerce.dto.CartItemDTO;
import com.example.ecommerce.dto.CartResponseDTO;
import com.example.ecommerce.entity.Cart;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.CartRepository;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepo;
    @Autowired
    private ProductRepository productRepo;

    @Transactional
    public CartResponseDTO addToCart(Long userId, Long productId, Integer qty) {
        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getAvailabilityQty() == null || product.getAvailabilityQty() <= 0) {
            throw new RuntimeException("Product out of stock");
        }

        // Check if product already exists in cart
        Optional<Cart> existingCart = cartRepo.findByUserIdAndProductId(userId, productId);
        Cart cartItem;
        if (existingCart.isPresent()) {
            cartItem = existingCart.get();
            cartItem.setQuantity(cartItem.getQuantity() + qty);
        } else {
            cartItem = new Cart();
            cartItem.setUserId(userId);
            cartItem.setProduct(product);
            cartItem.setQuantity(qty);
        }

        cartRepo.save(cartItem);

        // Return as DTO
        return new CartResponseDTO(
                "Item added to cart successfully",
                product.getName(),
                cartItem.getQuantity(),
                product.getPrice(),
                cartItem.getQuantity() * product.getPrice()
        );
    }

    public List<CartItemDTO> getCart(Long userId) {
        List<Cart> cartItems = cartRepo.findByUserId(userId);
        return cartItems.stream()
                .map(item -> new CartItemDTO(
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getProduct().getPrice(),
                        item.getQuantity() * item.getProduct().getPrice(),
                        item.getProduct().getId(),
                        item.getProduct().getMainImageUrl()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public CartResponseDTO removeFromCart(Long userId, Long productId) {
        Optional<Cart> existingCart = cartRepo.findByUserIdAndProductId(userId, productId);

        if (existingCart.isEmpty()) {
            throw new RuntimeException("Product not in cart");
        }
        Cart cartItem = existingCart.get();
        int updatedQty = cartItem.getQuantity() - 1; // reduce quantity by 1
        if (updatedQty > 0) {
            cartItem.setQuantity(updatedQty);
            cartRepo.save(cartItem);

            return new CartResponseDTO(
                    "Product quantity reduced by 1",
                    cartItem.getProduct().getName(),
                    updatedQty,
                    cartItem.getProduct().getPrice(),
                    updatedQty * cartItem.getProduct().getPrice()
            );
        } else {
            cartRepo.delete(cartItem);
            return new CartResponseDTO(
                    "Product removed from cart",
                    cartItem.getProduct().getName(),
                    0,
                    cartItem.getProduct().getPrice(),
                    0.0
            );
        }
    }

    @Override
    @Transactional
    public void deleteItemFromCart(Integer userId, Integer productId) {
        cartRepo.deleteByUserIdAndProductId(userId, productId);
    }

}

