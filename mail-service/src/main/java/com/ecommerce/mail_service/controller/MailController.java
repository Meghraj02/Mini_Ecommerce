package com.ecommerce.mail_service.controller;

import com.ecommerce.mail_service.model.MailData;
import com.ecommerce.mail_service.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/mail-app")
public class MailController {


    private final MailService mailService;

    @Autowired
    public MailController(MailService mailService){
     this.mailService=mailService;
    }
    @PostMapping("/send-mail")
    public ResponseEntity<String> sendMail(@RequestBody MailData mailData) {
        mailService.sendEmail(mailData);
        return ResponseEntity.ok("Mail sent successfully!");
    }


//    // POST http://localhost:65500/mail-app/send-mail
//    @PostMapping("/send-mail")
//    public ResponseEntity<String> sendEmail(@RequestBody MailData mailData) {
//        String result = mailService.sendEmail(mailData);
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }
}
