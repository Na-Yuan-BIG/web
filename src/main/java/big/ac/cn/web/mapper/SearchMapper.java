package big.ac.cn.web.mapper;

import big.ac.cn.web.entity.VarInfo;

import java.util.HashMap;
import java.util.List;

public interface SearchMapper {
    List<VarInfo> selectByTerms(HashMap<String, Object> hashMap);
    List<VarInfo> selectByPos(HashMap<String, Object> hashMap);
}