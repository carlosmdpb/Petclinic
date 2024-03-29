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

    public PetHotelRoomDTO(String name, String type, String clinic, Integer size) {
        this.name = name;
        this.type = type;
        this.clinic = clinic;
        this.size = size;
    }

    public PetHotelRoomDTO(String name, String type) {
        this.name = name;
        this.type = type;
    }
}
