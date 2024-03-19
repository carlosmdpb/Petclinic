package org.springframework.samples.petclinic.booking;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.samples.petclinic.pet.Pet;
import org.springframework.samples.petclinic.pet.PetType;
import org.springframework.samples.petclinic.pethotelroom.PetHotelRoom;

public interface BookingRepository extends CrudRepository<Booking, Integer>{
    @Query("SELECT COUNT(b) = 0 FROM Booking b WHERE b.room = :hotel AND ((b.startDate <= :endDate AND b.endDate >= :startDate) OR (b.startDate >= :startDate AND b.endDate <= :endDate))")
public boolean checkAvailability(PetHotelRoom hotel, LocalDate startDate, LocalDate endDate);
    
@Query("SELECT CASE WHEN COUNT(h) > 0 THEN true ELSE false END FROM PetHotelRoom h JOIN h.allowedPetType apt WHERE h = :hotel AND apt = :petType")
public boolean checkIsPetAllowed(PetHotelRoom hotel, PetType petType);

@Query("SELECT COUNT(b) = 0 FROM Booking b JOIN b.pet p WHERE p = :pet AND ((b.startDate <= :endDate AND b.endDate >= :startDate) OR (b.startDate >= :startDate AND b.endDate <= :endDate))")
public boolean checkPetBookingOverlap(Pet pet, LocalDate startDate, LocalDate endDate);

@Query("SELECT b FROM Booking b WHERE b.pet = :pet")
public List<Booking> findByPet(Pet pet);

}
