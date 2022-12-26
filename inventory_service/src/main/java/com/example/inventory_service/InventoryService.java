package com.example.inventory_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Inventory getById(Long inventoryId) {
        return inventoryRepository.findById(inventoryId)
                                .orElseThrow(() -> new InventoryNotFoundException(inventoryId));
    }

    public Inventory createInventory(Inventory newInventory) {
        return inventoryRepository.save(newInventory);
    }
}
