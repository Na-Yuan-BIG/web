package big.ac.cn.web.entity;

public class Gene {
    private Integer id;
    private String chrom;
    private Integer varStart;
    private Integer varEnd;
    private String refGene;


//    public Integer getId() {
//        return id;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }

    public String getChrom() {
        return chrom;
    }

    public void setChrom(String chrom) {
        this.chrom = chrom;
    }

    public Integer getVarStart() {
        return varStart;
    }

    public void setVarStart(Integer varStart) {
        this.varStart = varStart;
    }

    public Integer getVarEnd() {
        return varEnd;
    }

    public void setVarEnd(Integer varEnd) {
        this.varEnd = varEnd;
    }



    public String getRefGene() {
        return refGene;
    }

    public void setRefGene(String refGene) {
        this.refGene = refGene;
    }


}




