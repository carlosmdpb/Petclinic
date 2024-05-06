package org.springframework.samples.petclinic.vet;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.user.User;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/v2/plan")
@Tag(name = "Plans", description = "API for the  management of  Princing Plans of the applications")
@SecurityRequirement(name = "bearerAuth")
public class VetPlanController {
    
    private final VetService vetService;
	private final UserService userService;

	@Autowired
	public VetPlanController(VetService vetService, UserService userService) {
		this.vetService = vetService;
		this.userService = userService;
	}

    @GetMapping
	public ResponseEntity<Map<String, String>> getPlan() {
    	User user = userService.findCurrentUser();
    	String plan = userService.findVetByUser(user.getId()).getClinic().getPlan().name();
    
    	Map<String, String> response = new HashMap<>();
    	response.put("plan", plan);

    	return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
