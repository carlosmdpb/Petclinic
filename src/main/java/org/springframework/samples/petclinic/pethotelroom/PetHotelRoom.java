package org.springframework.samples.petclinic.pethotelroom;

import java.util.ArrayList;

import java.util.List;

import org.springframework.samples.petclinic.clinic.Clinic;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.pet.PetType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "pet_hotel_rooms")
public class PetHotelRoom extends BaseEntity {

    @Column(name = "name")
    @NotBlank
    private String name;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private PetType allowedPetType;

    @Valid
    @ManyToOne
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    @Column(name = "size")
    private Integer size;

    // Inside PetHotelRoom class
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

}
