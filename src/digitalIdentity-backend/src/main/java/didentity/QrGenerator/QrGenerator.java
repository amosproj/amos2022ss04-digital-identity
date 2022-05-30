package didentity.QrGenerator;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import java.awt.image.BufferedImage;
import java.awt.image.RenderedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;

public class QrGenerator {

    public BufferedImage generateQRCodeImage(String url) throws Exception {
        QRCodeWriter barcodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = barcodeWriter.encode(url, BarcodeFormat.QR_CODE, 200, 200);

        System.out.print(MatrixToImageWriter.toBufferedImage(bitMatrix));

        return MatrixToImageWriter.toBufferedImage(bitMatrix);
    }

    public File getImageAsJpg (RenderedImage image, String name) throws IOException {
        File outputfile = new File(name + ".jpg");
        ImageIO.write(image, "jpg", outputfile);
        return outputfile;
    }

    public File getImageAsPng (RenderedImage image, String name) throws IOException {
        File outputfile = new File(name + ".png");
        ImageIO.write(image, "png", outputfile);
        return outputfile;
    }

}
