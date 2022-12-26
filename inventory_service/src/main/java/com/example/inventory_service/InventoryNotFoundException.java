package com.example.inventory_service;

public class InventoryNotFoundException extends RuntimeException {

    public InventoryNotFoundException(Long inventoryId) {
        super("Inventory with id " + inventoryId + " is not found!");
    }
}
