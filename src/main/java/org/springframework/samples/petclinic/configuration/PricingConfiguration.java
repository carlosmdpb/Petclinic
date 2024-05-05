package org.springframework.samples.petclinic.configuration;

import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.javapoet.ClassName;
import org.springframework.samples.petclinic.owner.OwnerService;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;
import io.github.isagroup.PricingContext;
import jakarta.security.auth.message.AuthException;



@Component
public class PricingConfiguration extends PricingContext {

    @Autowired
    private UserService userService;

    Logger logger = Logger.getLogger(ClassName.class.getName());

    @Override public String getJwtSecret(){ return "mySecret"; }
    @Override public String getConfigFilePath(){ return "pricing/pricing.yml"; }
    public Object getUserAuthorities() {
        Map<String, String> authorities = new HashMap<>();
        authorities.put("role", "OWNER");
        return authorities; }

    @Override public Map<String, Object> getUserContext() {
        Map<String, Object> userContext = new HashMap<>();
        try{
            return userService.findUserContext();
        }catch(Exception e){
            e.printStackTrace();
            return userContext;
        }
    }
    @Override public String getUserPlan() {
        try{
            String userPlan = userService.findUserPlan();
            return userPlan;
        }catch(Exception e){
            e.printStackTrace();
            return "BASIC";
        }
    }
    

}
    

