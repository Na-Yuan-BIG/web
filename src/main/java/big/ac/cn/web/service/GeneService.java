package big.ac.cn.web.service;

import big.ac.cn.web.entity.Gene;
import big.ac.cn.web.mapper.GeneMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service
public class GeneService {
    @Resource
    private GeneMapper geneMapper=null;

    public List<Gene> selectByPos (HashMap<String, Object> hashmap){
        return geneMapper.selectByPos(hashmap);
    }
}
