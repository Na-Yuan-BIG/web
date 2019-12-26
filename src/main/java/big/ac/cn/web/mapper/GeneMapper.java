package big.ac.cn.web.mapper;

import big.ac.cn.web.entity.Gene;

import java.util.HashMap;
import java.util.List;

public interface GeneMapper {
    List<Gene> selectByPos(HashMap<String, Object> hashMap);
}