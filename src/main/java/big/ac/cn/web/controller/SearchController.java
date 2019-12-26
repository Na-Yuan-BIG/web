package big.ac.cn.web.controller;


import big.ac.cn.web.entity.VarInfo;
import big.ac.cn.web.service.SearchService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;


@Controller
public class SearchController {
    @Resource
    private SearchService varservice = null;


    @RequestMapping(value = "/variant",produces = "application/json;charset=UTF-8")
    @ResponseBody
    public List<VarInfo>  select(@RequestParam(value = "chr") String chr,@RequestParam(value = "bp") String bp) {
        HashMap<String, Object> hashmap = new HashMap<>(15);
        List<VarInfo> list = new ArrayList();
        if (chr != null && chr != "") {
            hashmap.put("chrom", chr);
            String tableindex="chr"+chr;
            hashmap.put("tabIndex", tableindex);
        }
        if (bp != null && bp != "") {
            hashmap.put("varStart", bp);
        }
        list = varservice.selectByTerms(hashmap);
        return list ;
    }
}
