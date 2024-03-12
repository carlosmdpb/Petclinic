package org.springframework.samples.petclinic.pethotelroom;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PetHotelRoomDTO {
    String name;
    String type;
    String clinic;
    Integer size;

    public PetHotelRoomDTO() {

    }
}
