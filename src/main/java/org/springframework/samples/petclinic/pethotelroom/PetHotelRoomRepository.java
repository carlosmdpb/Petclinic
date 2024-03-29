package org.springframework.samples.petclinic.pethotelroom;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface PetHotelRoomRepository extends CrudRepository<PetHotelRoom, Integer> {

    @Query("SELECT p FROM PetHotelRoom p WHERE p.clinic.clinicOwner.user.id = :userId")
    List<PetHotelRoom> findPetHotelRoomsByUserId(int userId) throws DataAccessException;

}
