package org.springframework.samples.petclinic.adoptions;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/offer")
public class OfferController {

    private final OfferService offerService;
    private final AdoptationService adoptationService;

    public OfferController(OfferService offerService, AdoptationService adoptationService) {
        this.offerService = offerService;
        this.adoptationService = adoptationService;
    }

    @GetMapping
    public ResponseEntity<List<Offer>> findAllOffers() {
        return new ResponseEntity<>(offerService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/notOffered/{userId}")
    public ResponseEntity<List<Adoptation>> findAllAdoptationsNotOffered(@PathVariable("userId") int userId) {
        return new ResponseEntity<>(offerService.findAllAdoptationNotOffered(userId), HttpStatus.OK);
    }

    @GetMapping("/received/{userId}")
    public ResponseEntity<List<Offer>> findOffersReceived(@PathVariable("userId") Integer userId) {
        return new ResponseEntity<>(offerService.findAllOffersReceived(userId), HttpStatus.OK);
    }

    @GetMapping("/sent/{userId}")
    public ResponseEntity<List<Offer>> findOffersSent(@PathVariable("userId") Integer userId) {
        return new ResponseEntity<>(offerService.findAllOffersByUserId(userId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Offer> createOffer(@RequestBody OfferDTO offerDTO) {
        offerService.createOffer(offerDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);

    }

    @PutMapping("/update/{offerId}")
    public ResponseEntity<Offer> updateOffer(@RequestBody String status, @PathVariable("offerId") Integer offerId) {
        Offer offer = offerService.updateOffer(status, offerId);
        return new ResponseEntity<>(offer,HttpStatus.OK);
    }

    @DeleteMapping("/{petId}")
    public ResponseEntity<Adoptation> deleteAdoptation(@PathVariable("petId") Integer petId) {
        List<Adoptation> adoptations = adoptationService.findAdoptationByPetId(petId);
        for(Adoptation adoptation : adoptations){
            if(adoptation.getIsAccepted() == false){
                adoptationService.deleteAdoptation(adoptation);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }





}
