package org.springframework.samples.petclinic.booking;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.pet.Pet;
import org.springframework.samples.petclinic.pethotelroom.PetHotelRoom;

@Entity
@Getter
@Setter
public class Booking extends BaseEntity {
    @Column(name = "start_date")
    @NotNull
    private LocalDate startDate;

    @Column(name = "end_date")
    @NotNull
    private LocalDate endDate;

    @ManyToOne
    @NotNull
    private Pet pet;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private PetHotelRoom room;
}