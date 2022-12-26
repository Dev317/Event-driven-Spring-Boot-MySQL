package com.example.inventory_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="*")
@RequestMapping(path="/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping(path="/")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<List<Inventory>>(inventoryService.getAllInventory(), HttpStatus.OK);
    }

    @GetMapping(path="/{id}")
    public ResponseEntity<?> getInventoryById(@PathVariable(name="id") String id) {
        Long inventoryId = Long.parseLong(id);

        try {
            Inventory foundInventory = inventoryService.getById(inventoryId);
            return new ResponseEntity<Inventory>(foundInventory, HttpStatus.OK);
        } catch (InventoryNotFoundException ex) {
            return new ResponseEntity<String>(ex.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
