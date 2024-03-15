package org.springframework.samples.petclinic.adoptions;

import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.owner.Owner;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "requests")
@Getter
@Setter
public class AdoptionRequest extends BaseEntity{
    
    @NotNull
	private String requestDescription;

    @ManyToOne(optional = false)
	private Owner owner;
	
	@ManyToOne(optional = false)
	private AdoptionAnnouncement adoptionAnnouncement;
	
}