package org.springframework.samples.petclinic.adoptions;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.samples.petclinic.clinic.Clinic;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.owner.Owner;
import org.springframework.samples.petclinic.pet.Pet;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "announcements")
@Getter
@Setter
public class AdoptionAnnouncement extends BaseEntity{
    
    @OneToOne(optional = false)
    @JoinColumn(name = "pet_id")
    private Pet pet;

    @ManyToOne(optional = false)
	@JoinColumn(name = "owner_id")
	private Owner owner;
	
	@NotNull
	private Boolean alreadyAdopted;
	
	@NotNull
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@PastOrPresent
	private LocalDate adoptionPublicationDate;
	
	@ManyToOne
	@JoinColumn(name = "clinic_id")
	private Clinic clinic;
}
