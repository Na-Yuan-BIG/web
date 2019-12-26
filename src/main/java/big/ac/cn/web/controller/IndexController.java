package big.ac.cn.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class IndexController {
    private static Logger logger = LoggerFactory.getLogger(IndexController.class);

    @RequestMapping("/")
    public String index() {
        return "home";
    }
//    @RequestMapping("/test")
//    public String test(Model model) {
//        model.addAttribute("login",1111);
//        return "run";
//    }
//    @RequestMapping("/results")
//    public String search(Model model) {
//        model.addAttribute("login",1111);
//        return "results";
//    }
//    @RequestMapping("/results")
//    public String output(Model model,@RequestParam("inputid") String inputid) {
//        model.addAttribute("inputid",inputid);
//        return "results";
//    }
    //    @RequestMapping("/variantBrowseN")
//    public String variantBrowse(Model model) {
//        model.addAttribute("login",1111);
//        return "variant_browseN";
//    }
    @RequestMapping("/submit")
    public String browse(Model model) {
        model.addAttribute("login",1111);
        return "submit";
    }
    @RequestMapping("/hello")
    public String svg(Model model) {
        model.addAttribute("login",1111);
        return "hello";
    }
    @RequestMapping("/canvas")
    public String can(Model model) {
        model.addAttribute("login",1111);
        return "canvas";
    }
    @RequestMapping("/demoResults")
    public String demo(Model model) {
        model.addAttribute("login",1111);
        return "demo_results";
    }
    @RequestMapping("/seechrom")
    public String download(Model model) {
        model.addAttribute("login",1111);
        return "circos";
    }
    @RequestMapping("/seecgwas")
    public String cgwas(Model model) {
        model.addAttribute("login",1111);
        return "seecgwas";
    }
    @RequestMapping("/chrom")
    public String chr(Model model) {
        model.addAttribute("login",1111);
        return "chrom";
    }
    @RequestMapping("/documentation")
    public String documents(Model model) {
        model.addAttribute("login",1111);
        return "documents";
    }
    @RequestMapping("/cgwas")
    public String help(Model model) {
        model.addAttribute("login",1111);
        return "cgwas";
    }
}