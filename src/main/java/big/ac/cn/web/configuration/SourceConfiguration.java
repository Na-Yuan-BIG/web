package big.ac.cn.web.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class SourceConfiguration  extends WebMvcConfigurerAdapter {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        //读取配置文件中的上传路径
        registry.addResourceHandler("/file/**").addResourceLocations("file:/asnas/pmod/bigyuann/cgwas/");
        super.addResourceHandlers(registry);
    }
}