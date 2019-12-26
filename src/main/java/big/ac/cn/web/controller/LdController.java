package big.ac.cn.web.controller;


import net.sf.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;


@Controller
public class LdController {

    @RequestMapping(value = "/ldplot",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String plot(@RequestParam("blockchr") String blockchr,@RequestParam("blockstart") String blockstart,@RequestParam("blockend") String blockend,@RequestParam("area") String area){
        Date date=new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd-HH:mm:ss");
        String dateString = formatter.format(date);
        String outlog="/asnas/pmod/bigyuann/cgwas/userdata/" + dateString + ".out";
        String errlog="/asnas/pmod/bigyuann/cgwas/userdata/" + dateString + ".err" ;
        String sh="/asnas/pmod/bigyuann/cgwas/php/run.sh";
        String command = "nohup sh " + sh + " " +blockchr+" " +blockstart +" "+blockend  +" " + area +" "+dateString + "  1>"+ outlog +  "  2>"+ errlog + "  &";
        System.out.println(command);
        try {
            Process pro = Runtime.getRuntime().exec(command);
            pro.waitFor();
        } catch (Exception e) {
            e.printStackTrace();
        }
        JSONObject result = new JSONObject();
        result.put("data", dateString);
        return result.toString();
    }


    @ResponseBody
    @RequestMapping(value ="/done")
    public String python(String filename) {
        File file = new File(filename);
        System.out.println(filename + "controller");
        if (!file.exists()){
            return "none";
        }
        else{
            return "exists";
        }
    }

    @RequestMapping("/job/{md5}")
    public String status(ModelMap model, @PathVariable("md5")  String md5) {
        String filename="/asnas/pmod/bigyuann/cgwas/"+md5+".cgwas.tar.gz";
        String stat;
        File file = new File(filename);
        System.out.println(filename + "status");
        if (!file.exists()){
            stat="running";
        }
        else{
            stat="done";
        }
        model.addAttribute("stat",stat);
        model.addAttribute("md5",md5);
        return "results";
    }
}
