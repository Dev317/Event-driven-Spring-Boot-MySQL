package com.example.admin_dashboard;

import java.util.Date;
import java.util.UUID;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/admin")
public class AdminController {

    @Autowired
    private RabbitTemplate template;

    @PostMapping("/publish")
    public ResponseEntity<?> publishNewInventoryMessage(@RequestBody CustomMessage message) {
        message.setMessageId(UUID.randomUUID().toString());
        message.setMessageDate(new Date());

        System.out.println(message);
        template.convertAndSend(MQConfig.EXCHANGE, "inventory.new", message);
        return new ResponseEntity<String>("Message published", HttpStatus.OK);
    }
}
