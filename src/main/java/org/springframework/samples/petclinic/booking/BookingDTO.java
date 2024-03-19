package org.springframework.samples.petclinic.booking;

import java.time.LocalDate;

import org.springframework.samples.petclinic.pethotelroom.PetHotelRoomDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class BookingDTO {
    private LocalDate startDate;
    private LocalDate endDate;
    private String pet;
    private String hotel;


    public BookingDTO(){

    }
    
}
