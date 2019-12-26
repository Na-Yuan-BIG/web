package big.ac.cn.web.service;

import big.ac.cn.web.entity.VarInfo;
import big.ac.cn.web.mapper.SearchMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service
public class SearchService {
    @Resource
    private SearchMapper searchMapper=null;
    public List<VarInfo> selectByTerms ( HashMap<String, Object> hashmap){
        return searchMapper.selectByTerms(hashmap);
    }
    public List<VarInfo> selectByPos ( HashMap<String, Object> hashmap){
        return searchMapper.selectByPos(hashmap);
    }
}
