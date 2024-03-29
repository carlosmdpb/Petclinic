package org.springframework.samples.petclinic.adoptions;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.owner.Owner;
import org.springframework.samples.petclinic.pet.Pet;


import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Adoptation extends BaseEntity {

    /*
     * Create an Adoptions functionality. As an owner, we can create an adoption
     * request when we are not able to take care of our pet. Other owners could list
     * the pets available for adoption and apply for it (adoption applications must
     * have a description of how the applicant will take care of the pet). If the
     * original owner approves the application, the pet will be transferred to the
     * applicant and he/she will be the new owner of the pet.
     */

    @NotNull
    @ManyToOne
    @Valid
    private Owner owner;

    @NotNull
    @ManyToOne
    @Valid
    private Pet pet;

    Boolean isAccepted;

}
