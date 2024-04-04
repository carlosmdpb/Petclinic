package org.springframework.samples.petclinic.adoptions;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/api/v1/adoption")
@SecurityRequirement(name = "bearerAuth")
public class AdoptationController {

    private final AdoptationService adoptationService;

    public AdoptationController(AdoptationService adoptationService) {
        this.adoptationService = adoptationService;
    }

    @GetMapping
    public ResponseEntity<List<Adoptation>> findAllAdoptations() {
        return new ResponseEntity<>(adoptationService.findAll(), HttpStatus.OK);
    }

    @GetMapping("{adoptionId}")
    public ResponseEntity<Adoptation> findAdoptionById(@PathVariable("adoptionId") Integer adoptionId) {
        return new ResponseEntity<>(adoptationService.findAdoptationById(adoptionId), HttpStatus.OK);
    }

    @GetMapping("/petsIds")
    public ResponseEntity<List<Integer>> findAllPetAdoptedIds() {
        List<Adoptation> adoptations = adoptationService.findAll();
        List<Integer> petIds = new ArrayList<>();
        for (Adoptation adoptation : adoptations) {
            if(!adoptation.getIsAccepted()){
                Integer id = adoptation.getPet().getId();
                petIds.add(id);
            }

        }

        return new ResponseEntity<>(petIds, HttpStatus.OK);
    }

    @PostMapping("/{petId}")
    public ResponseEntity<Adoptation> createAdoptation(@PathVariable("petId") Integer petId) {
        adoptationService.createAdoptation(petId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}
