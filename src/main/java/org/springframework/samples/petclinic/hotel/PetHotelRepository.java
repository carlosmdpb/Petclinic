package org.springframework.samples.petclinic.hotel;

import org.springframework.data.repository.CrudRepository;

public interface PetHotelRepository extends CrudRepository<PetHotelRoom, Integer>{
    
    
}
