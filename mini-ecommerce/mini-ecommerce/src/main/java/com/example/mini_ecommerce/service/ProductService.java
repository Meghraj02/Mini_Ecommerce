package com.example.mini_ecommerce.service;

import com.example.mini_ecommerce.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(String id);
    Product createProduct(Product product);
    Product updateProduct(String id, Product product);
    void deleteProduct(String id);
}
