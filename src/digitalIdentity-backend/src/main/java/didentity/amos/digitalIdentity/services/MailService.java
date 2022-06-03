package didentity.amos.digitalIdentity.services;

import java.io.File;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import didentity.QrGenerator.QrGenerator;


@Component
public class MailService {

    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${spring.mail.username}")
    private String mailUsername;

    public void sendInvitation(String to, String invitationLink) {


        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom(mailUsername);
            helper.setTo(to);
            helper.setSubject("Einladung für Ihre digitale Identität");

            String htmlText = "<img src='cid:logo' alt='logo' height='200'> " +
                "<h1>Bereit für Ihre neue digitale Identität? Legen wir los.</h1>" +
                "<p>Laden Sie sich die Lissi App herunter. Beispielsweise im Play Store oder im App Store.</p>" + 
                "<p>Ihr Einladungslink lautet: " + invitationLink + "</p>" + 
            "<p>Anstattdessen können Sie auch den QR-Code im Anhang scannen</p>";
            helper.setText(htmlText, true);
            helper.addInline("logo", new ClassPathResource("img/logo.png"));
            File qrCode = new QrGenerator().generateQRCodeImage(invitationLink, "qrCode");
            helper.addAttachment("qrcode", qrCode);
            helper.setText(htmlText, true);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }
        







    }
}
