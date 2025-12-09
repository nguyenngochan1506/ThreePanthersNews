package vn.edu.hcmuaf.fit.ThreePanthers.services;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Async 
    public void sendWelcomeEmail(String toEmail, String username) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Chào mừng đến với ThreePanthers!");
        message.setText("Xin chào " + username + ",\n\nCảm ơn bạn đã đăng ký tài khoản thành công.\nChúc bạn có những trải nghiệm tuyệt vời!");
        
        mailSender.send(message);
    }
}