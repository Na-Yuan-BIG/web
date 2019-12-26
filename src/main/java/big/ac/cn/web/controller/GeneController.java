package big.ac.cn.web.controller;


import big.ac.cn.web.entity.Gene;
import big.ac.cn.web.service.GeneService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Controller
public class GeneController {
    @Resource
    private GeneService varservice = null;


    @RequestMapping(value = "/gene",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public List<Gene>  select(@RequestParam(value = "chr") String chr, @RequestParam(value = "start") String start, @RequestParam(value = "end") String end) {
        HashMap<String, Object> hashmap = new HashMap<>(15);
        List<Gene> list = new ArrayList();
        if (chr != null && chr != "") {
            hashmap.put("chrom", chr);
        }
        if (start != null && start != "") {
            hashmap.put("varStart", start);
        }
        if (end != null && end != "") {
            hashmap.put("varEnd", end);
        }
        list = varservice.selectByPos(hashmap);
        return list ;
    }
}
