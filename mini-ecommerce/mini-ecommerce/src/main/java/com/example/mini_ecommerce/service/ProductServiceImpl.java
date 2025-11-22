package com.example.mini_ecommerce.service.impl;

import com.example.mini_ecommerce.model.Product;
import com.example.mini_ecommerce.repository.ProductRepository;
import com.example.mini_ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(String id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(String id, Product product) {
        Optional<Product> existing = productRepository.findById(id);
        if (existing.isPresent()) {
            Product p = existing.get();
            p.setProductName(product.getProductName());
            p.setCategory(product.getCategory());
            p.setDescription(product.getDescription());
            p.setPrice(product.getPrice());
            p.setImage(product.getImage());
            return productRepository.save(p);
        }
        return null;
    }

    @Override
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}
