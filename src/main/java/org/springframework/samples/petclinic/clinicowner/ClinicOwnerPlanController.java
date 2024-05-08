package org.springframework.samples.petclinic.clinicowner;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.clinic.Clinic;
import org.springframework.samples.petclinic.clinic.PricingPlan;
import org.springframework.samples.petclinic.owner.Owner;
import org.springframework.samples.petclinic.user.User;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/api/v3/plan")
public class ClinicOwnerPlanController {

    private final ClinicOwnerService clinicOwnerService;
    private final UserService userService;

    @Autowired
    public ClinicOwnerPlanController(ClinicOwnerService clinicOwnerService,UserService userService){
        this.clinicOwnerService=clinicOwnerService;
        this.userService=userService;
    }

    @GetMapping
	public ResponseEntity<Map<String, String>> getPlan() {
    	User user = userService.findCurrentUser();
    	String plan = userService.findClinicOwnerByUser(user.getId()).getClinics().stream().findFirst().get().getPlan().name();
    	Map<String, String> response = new HashMap<>();
    	response.put("plan", plan);

    	return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Owner> updatePlan(@RequestBody @Valid PricingPlan plan, @PathVariable("id") Integer id ) {
	 	User user = userService.findCurrentUser();
	 	ClinicOwner clinicOwner = userService.findClinicOwnerByUser(user.getId());
		clinicOwner.getClinics().stream().findFirst().get().setPlan(plan);
		clinicOwnerService.saveClinicOwner(clinicOwner);
		return new ResponseEntity<>(HttpStatus.OK);
	 }
    
}
