package org.springframework.samples.petclinic.clinicowner;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.clinic.Clinic;
import org.springframework.samples.petclinic.user.User;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.samples.petclinic.vet.VetService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v3/plan")
@Tag(name = "Plans", description = "API for the  management of  Princing Plans of the applications")
@SecurityRequirement(name = "bearerAuth")
public class ClinicOwnerPlanController {

    private final ClinicOwnerService clinicOwnerService;
	private final UserService userService;

	@Autowired
	public ClinicOwnerPlanController(ClinicOwnerService clinicOwnerService, UserService userService) {
		this.clinicOwnerService = clinicOwnerService;
		this.userService = userService;
	}

    @GetMapping
    public ResponseEntity<Map<String, List<String>>> getPlan() {
    User user = userService.findCurrentUser();
    Set<Clinic> clinics = userService.findClinicOwnerByUser(user.getId()).getClinics(); 
    
    Map<String, List<String>> response = new HashMap<>();
    for (Clinic clinic : clinics) {
        String plan = clinic.getPlan().name();
        response.computeIfAbsent("plans", k -> new ArrayList<>()).add(plan);
    }

    return new ResponseEntity<>(response, HttpStatus.OK);
}

    
}
