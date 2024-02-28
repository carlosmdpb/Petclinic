package org.springframework.samples.petclinic.hotel;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.clinic.Clinic;
import org.springframework.samples.petclinic.clinic.ClinicRepository;
import org.springframework.samples.petclinic.clinic.ClinicService;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@Service
public class PetHotelService {
    @Autowired
    private PetHotelRepository hotelRepository;
    @Autowired
    private ClinicRepository clinicRepository;
    @Autowired
    private ClinicService clinicService;
 
    public PetHotelRoom crearHotel(PetHotelRoom hotel) {
        Clinic clinic = clinicService.findClinicById(hotel.getClinic().getId());
        if (clinic == null) {
            throw new RuntimeException("Clinic Not Found for ID Provided: " + hotel.getClinic().getId());
        }
        hotel.setRoomName(hotel.getRoomName());
        hotel.setAllowedPetType(hotel.getAllowedPetType());
        hotel.setClinic(clinic);
        hotel.setSize(hotel.getSize());
        return hotelRepository.save(hotel);
    
        }

    @Transactional(readOnly = true)
    public List<PetHotelRoom> findAllHotel() {
        List<PetHotelRoom> hoteles= new ArrayList<PetHotelRoom>();
        hotelRepository.findAll().forEach(hoteles::add);
        return hoteles;
    }

    @Transactional
    public void deleteHotel(Integer hotelId) {
        PetHotelRoom hotel = hotelRepository.findById(hotelId)
            .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + hotelId));
        
        hotelRepository.delete(hotel);
    }

    @Transactional
    public void updateHotel(Integer hotelId, PetHotelRoom updatedHotel) {
        PetHotelRoom hotel = hotelRepository.findById(hotelId)
            .orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id: " + hotelId));
        
        hotel.setRoomName(updatedHotel.getRoomName());
        hotel.setSize(updatedHotel.getSize());
        hotel.setAllowedPetType(updatedHotel.getAllowedPetType());
        hotel.setClinic(updatedHotel.getClinic());


        hotelRepository.save(hotel);
    }

    
}

