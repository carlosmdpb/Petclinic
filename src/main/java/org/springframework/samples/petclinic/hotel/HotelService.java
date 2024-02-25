package org.springframework.samples.petclinic.hotel;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.clinic.Clinic;
import org.springframework.samples.petclinic.clinic.ClinicRepository;
import org.springframework.samples.petclinic.clinic.ClinicService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@Service
public class HotelService {
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private ClinicRepository clinicRepository;
    @Autowired
    private ClinicService clinicService;
 
    public Hotel crearHotel(Hotel hotel) {
        Clinic clinic = clinicService.findClinicById(hotel.getClinic().getId());
        if (clinic == null) {
            throw new RuntimeException("Clínica no encontrada para el ID proporcionado: " + hotel.getClinic().getId());
        }
        hotel.setRoomName(hotel.getRoomName());
        hotel.setAllowedPetType(hotel.getAllowedPetType());
        hotel.setClinic(clinic);
        hotel.setSize(hotel.getSize());
        return hotelRepository.save(hotel);
    
        }

    @Transactional(readOnly = true)
    public List<Hotel> findAllHotel() {
        List<Hotel> hoteles= new ArrayList<Hotel>();
        hotelRepository.findAll().forEach(hoteles::add);
        return hoteles;
    }

    
}

