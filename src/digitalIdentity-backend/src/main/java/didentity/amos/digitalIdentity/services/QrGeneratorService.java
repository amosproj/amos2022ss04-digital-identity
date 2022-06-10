package didentity.amos.digitalIdentity.services;

import java.io.File;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

@Service
public class QrGeneratorService {
    public File generateQRCodeImage(String url, String name) throws Exception {
        QRCodeWriter barcodeWriter = new QRCodeWriter();

        BitMatrix bitMatrix = barcodeWriter.encode(url, BarcodeFormat.QR_CODE, 200, 200);

        File outputfile = new File(name + ".png");
        ImageIO.write(MatrixToImageWriter.toBufferedImage(bitMatrix), "png", outputfile);

        return outputfile;
    }

}
