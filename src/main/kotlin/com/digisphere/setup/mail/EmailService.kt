package com.digisphere.setup.mail

import jakarta.mail.internet.MimeMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service

@Service
class EmailService(private val mailSender: JavaMailSender) {

    fun sendEmail(from: String, to: String, subject: String, htmlContent: String): Boolean {

        try {
            val message: MimeMessage = mailSender.createMimeMessage();
            val helper = MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            return true
        } catch (e: Exception) {
            println(e.message)
            return false
        }

    }

}