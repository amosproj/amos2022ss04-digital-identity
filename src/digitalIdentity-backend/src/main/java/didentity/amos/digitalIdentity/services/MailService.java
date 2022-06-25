package didentity.amos.digitalIdentity.services;

import java.io.File;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@Component
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${frontend.host.url.change.password}")
    private String changePasswordUrl;

    @Value("${spring.mail.username}")
    private String mailUsername;

    @Autowired
    private QrGeneratorService qrService;

    public boolean sendInvitation(String to, String invitationLink) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom(mailUsername);
            helper.setTo(to);
            helper.setSubject("Einladung für Ihre digitale Identität");

            String htmlText = "<img src='cid:logo' alt='logo' height='200'> " +
                    "<h1>Bereit für Ihre neue digitale Identität? Legen wir los.</h1>" +
                    "<p>Laden Sie sich die Lissi App herunter. Beispielsweise im Play Store oder im App Store.</p>" +
                    "<p>Ihr Einladungslink: <a href=\"" + invitationLink + "\">" + invitationLink + "</a> </p>" +
                    "<p>Anstattdessen können Sie auch den QR-Code im Anhang scannen</p>";
            helper.setText(htmlText, true);
            helper.addInline("logo", new ClassPathResource("img/logo.png"));
            File qrCode = qrService.generateQRCodeImage(invitationLink, "qrCode");
            helper.addAttachment("qrcode", qrCode);
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean sendPassword(String to, String strongPassword) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom(mailUsername);
            helper.setTo(to);
            helper.setSubject("Initiales Passwort für DIDentity");

            String changePasswordUrlPrefilled = changePasswordUrl + "?"
                    + "email=" + to + "&"
                    + "old_password=" + strongPassword;

            String htmlText = "<img src='cid:logo' alt='logo' height='200'> " +
                    "<h1>Hier ist Ihr initiales Passwort für Ihren Login in der DIDentity App</h1>" +
                    "<h2>Passwort:" + strongPassword + " </h2>" +
                    "<p>Geben Sie Ihr Passwort nicht weiter. Am besten ändern Sie es direkt <a href=\""
                    + changePasswordUrlPrefilled + "\">hier<a> </p>";
            helper.setText(htmlText, true);
            helper.addInline("logo", new ClassPathResource("img/logo.png"));
            mailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }
}
