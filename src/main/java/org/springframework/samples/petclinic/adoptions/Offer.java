package org.springframework.samples.petclinic.adoptions;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.owner.Owner;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Offer extends BaseEntity{

    @ManyToOne
    Owner offeringOwner;

    @NotBlank
    String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AdoptationStatus status;

    @ManyToOne
    Adoptation adoptation;

}
