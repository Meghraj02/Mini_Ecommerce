package com.ecommerce.mail_service.model;


import java.util.Objects;

public class MailData {
    private String receiver;
    private String messageBody;
    private String subject;
    private String attachment;


    public MailData() {
    }

    public MailData(String receiver, String messageBody, String subject, String attachment) {
        this.receiver = receiver;
        this.messageBody = messageBody;
        this.subject = subject;
        this.attachment = attachment;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getMessageBody() {
        return messageBody;
    }

    public void setMessageBody(String messageBody) {
        this.messageBody = messageBody;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        MailData mailData = (MailData) o;
        return Objects.equals(receiver, mailData.receiver) && Objects.equals(messageBody, mailData.messageBody) && Objects.equals(subject, mailData.subject) && Objects.equals(attachment, mailData.attachment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(receiver, messageBody, subject, attachment);
    }

    @Override
    public String toString() {
        return "MailData{" +
                "receiver='" + receiver + '\'' +
                ", messageBody='" + messageBody + '\'' +
                ", subject='" + subject + '\'' +
                ", attachment='" + attachment + '\'' +
                '}';
    }
}
