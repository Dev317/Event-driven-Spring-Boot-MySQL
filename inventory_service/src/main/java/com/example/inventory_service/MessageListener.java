package com.example.inventory_service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {

    @Autowired
    private InventoryService inventoryService;

    @RabbitListener(queues=MQConfig.QUEUE, ackMode="AUTO")
    public void listener(CustomMessage message) {
        System.out.println(message);
        Inventory newInventory = message.getInventory();
        inventoryService.createInventory(newInventory);
    }
}
