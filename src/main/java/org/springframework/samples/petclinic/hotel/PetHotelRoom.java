package org.springframework.samples.petclinic.hotel;

import java.util.List;


import org.springframework.samples.petclinic.clinic.Clinic;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.pet.PetType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "hotel")



public class PetHotelRoom extends BaseEntity{
    //solo los clinic owner en security, crear un pet hotel room
    
	@Column(name = "room_name")
    private String roomName;

    @OneToMany
    private List<PetType> allowedPetType;

	@ManyToOne
	@JoinColumn(name = "clinics_id", referencedColumnName = "id")
    private Clinic clinic;

    @Column(name = "size")
    private Integer size;
}
