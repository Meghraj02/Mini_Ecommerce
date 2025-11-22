package com.ecommerce.mail_service.service;

import com.ecommerce.mail_service.model.MailData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class MailServiceImpl implements MailService {


    private final JavaMailSender javaMailSender;

    @Autowired
    public MailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;

    }
    @Value("${spring.mail.username}")
    private String sender;

    @Override
    public String sendEmail(MailData mailData) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(mailData.getReceiver());
            mailMessage.setText(mailData.getMessageBody());
            mailMessage.setSubject(mailData.getSubject());
            javaMailSender.send(mailMessage);
            return "Mail sent to " + mailData.getReceiver();
        } catch (Exception e) {
            e.printStackTrace();
            return "Sending mail failed.";
        }
    }
}
