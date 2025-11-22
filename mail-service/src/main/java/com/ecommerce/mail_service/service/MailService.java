package com.ecommerce.mail_service.service;

import com.ecommerce.mail_service.model.MailData;

public interface MailService {
    String sendEmail(MailData mailData);
}
