package big.ac.cn.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


import java.io.*;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
public class UploadController {
    private static final Logger LOGGER = LoggerFactory.getLogger(UploadController.class);

    public static String crypt(String str) {
        if (str == null || str.length() == 0) {
            throw new IllegalArgumentException("String to encript cannot be null or zero length");
        }
        StringBuffer hexString = new StringBuffer();
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(str.getBytes());
            byte[] hash = md.digest();
            for (int i = 0; i < hash.length; i++) {
                if ((0xff & hash[i]) < 0x10) {
                    hexString.append("0" + Integer.toHexString((0xFF & hash[i])));
                } else {
                    hexString.append(Integer.toHexString(0xFF & hash[i]));
                }
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return hexString.toString();
    }


    @RequestMapping("/run")
    public String upload(ModelMap model, @RequestParam("md5") String md5, @RequestParam("file") MultipartFile file, @RequestParam(value = "email", required = false) String email, @RequestParam(value = "simuNum", required = false) String simuNum, @RequestParam(value = "gt", required = false) String gt, @RequestParam(value = "st", required = false) String st, @RequestParam(value = "ot", required = false) String ot, @RequestParam(value = "maxn", required = false) String maxn, @RequestParam(value = "ht", required = false) String ht, @RequestParam(value = "at", required = false) String at, @RequestParam(value = "factor", required = false) String factor) {
        System.out.println("dirName_md5+" + md5);
        String dir = "/asnas/pmod/bigyuann/cgwas/" + md5;
        File md5dir = new File(dir);
        if (!md5dir.exists()) {
            if (email == null || email.length() == 0) {
                email = "864214960@qq.com";
            }
            if (simuNum == null || simuNum.length() == 0) {
                simuNum = "1000";
            }
            if (gt == null || gt.length() == 0) {
                gt = "5e-8";
            }
            if (st == null || st.length() == 0) {
                st = "1e-6";
            }
            if (ot == null || ot.length() == 0) {
                ot = "1e-3";
            }
            if (maxn == null || maxn.length() == 0) {
                maxn = "30000";
            }
            if (ht == null || ht.length() == 0) {
                ht = "0.0005";
            }
            if (file.isEmpty()) {
                return "Upload failed, please select file";
            }
            String fileName = file.getOriginalFilename();
            String filePath = "/asnas/pmod/bigyuann/cgwas/";
            File dest = new File(filePath + fileName);
            System.out.println(fileName);

            try {
                file.transferTo(dest);
//            LOGGER.info("Upload success");
                /*run*/

                if (fileName.equals("input.zip")) {
                    String cmds = "md5sum " + fileName;
                    Process pr1 = Runtime.getRuntime().exec(cmds);

                    String md5sum = "";

                    BufferedInputStream in = new BufferedInputStream(pr1.getInputStream());
                    BufferedReader br = new BufferedReader(new InputStreamReader(in));
                    String lineStr;
                    while ((lineStr = br.readLine()) != null) {
                        md5sum += lineStr;
                    }
                    br.close();
                    in.close();

                    String inputmd5 = md5sum.substring(0, md5sum.indexOf(" "));
                    System.out.println("inputmd5:" + inputmd5);
                    if (inputmd5.equals("22e4a031cbb82f72c0ca22154578cb77")) {
                        gt = "5e-6";
                        st = "1e-4";
                    }

                }

//                String md5;
//                Date date = new Date();
//                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd-HH:mm:ss");
//                String dateString = formatter.format(date);
//                md5 = crypt(dateString);
//                System.out.println("md5:" + md5);


                model.addAttribute("md5", md5);
                model.addAttribute("email", email);
                /*cgwas*/
                String shfile = "/asnas/pmod/bigyuann/cgwas/run.sh";
                String outlog = "/asnas/pmod/bigyuann/cgwas/log/" + md5 + ".out";
                String errlog = "/asnas/pmod/bigyuann/cgwas/log/" + md5 + ".err";
                String pram = " " + simuNum + " " + gt + " " + st + " " + ot + " " + maxn + " " + ht + " " + at + " " + factor + " ";//$4..$12
                String command = "nohup sh " + shfile + " " + fileName + " " + md5 + " " + email + " " + pram + "  1> " + outlog + "  2> " + errlog + "  &";
                System.out.println(command);
                Process pr = Runtime.getRuntime().exec(command);
                return "run";
            } catch (IOException e) {
                LOGGER.error(e.toString(), e);
            }
            return "failed!";
        }
        model.addAttribute("md5", md5);
        model.addAttribute("email", email);
        return "run";
    }
}
