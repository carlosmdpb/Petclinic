package org.springframework.samples.petclinic.adoptions;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OfferDTO {

    String description;
    Integer offeringOwnerUserId;
    Integer adoptationId;

}
