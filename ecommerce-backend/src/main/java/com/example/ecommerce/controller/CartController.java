package com.example.ecommerce.controller;

import com.example.ecommerce.dto.CartItemDTO;
import com.example.ecommerce.dto.CartResponseDTO;
import com.example.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartResponseDTO> addToCart(
            @RequestParam Long userId,
            @RequestParam Long productId,
            @RequestParam Integer quantity) {
        try {
            CartResponseDTO response = cartService.addToCart(userId, productId, quantity);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CartResponseDTO(e.getMessage(), null, null, null, null));
        }
    }

    @GetMapping
    public List<CartItemDTO> getCart(@RequestParam Long userId) {
        return cartService.getCart(userId);
    }

    @PutMapping("/remove")
    public ResponseEntity<CartResponseDTO> removeFromCart(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        try {
            CartResponseDTO response = cartService.removeFromCart(userId, productId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new CartResponseDTO(e.getMessage(), null, null, null, null));
        }
    }

    @DeleteMapping("/deleteItem")
    public ResponseEntity<String> deleteItemFromCart(@RequestParam Integer userId,
                                                     @RequestParam Integer productId) {
        cartService.deleteItemFromCart(userId, productId);
        return ResponseEntity.ok("Item deleted from cart successfully.");
    }



}
