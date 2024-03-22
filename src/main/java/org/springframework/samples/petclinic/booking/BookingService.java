package org.springframework.samples.petclinic.booking;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.pethotelroom.PetHotelRoom;
import org.springframework.samples.petclinic.pethotelroom.PetHotelRoomRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PetHotelRoomRepository petHotelRoomRepository;

    @Transactional(readOnly = true)
    public Booking findBookingById(int bookingId) throws DataAccessException {
        return bookingRepository.findById(bookingId).orElse(null);
    }

    @Transactional(readOnly = true)
    public Iterable<Booking> findAllBookings() throws DataAccessException {
        return bookingRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<PetHotelRoom> findAllHotelRooms() throws DataAccessException {
        List<PetHotelRoom> rooms = new ArrayList<PetHotelRoom>();
        petHotelRoomRepository.findAll().forEach(rooms::add);
        return rooms;
    }

    @Transactional
    public Booking createBooking(Booking booking) throws DataAccessException {
        //Validar fechas
        if(booking.getStartDate().isAfter(booking.getEndDate())){
            throw new IllegalArgumentException("La fecha de inicio no puede ser posterior a la fecha de fin");
        }
        //Validar disponibilidad
        if(!bookingRepository.checkAvailability(booking.getRoom(), booking.getStartDate(), booking.getEndDate())){
            throw new IllegalArgumentException("La habitación no está disponible en las fechas seleccionadas");
        }
        //Validar entrada de habitación y validar reserva de mascota
        if(bookingRepository.checkIsPetAllowed(booking.getRoom(), booking.getPet().getType())){
            throw new IllegalArgumentException("La mascota no está permitida en la habitación seleccionada");
        }
        if(!bookingRepository.checkPetBookingOverlap(booking.getPet(), booking.getStartDate(), booking.getEndDate())){
            throw new IllegalArgumentException("La mascota ya tiene una reserva en las fechas seleccionadas");
        }
        Booking newBooking = new Booking();
        newBooking.setStartDate(booking.getStartDate());
        newBooking.setEndDate(booking.getEndDate());
        newBooking.setPet(booking.getPet());
        newBooking.setRoom(booking.getRoom());
        Booking savedBooking = bookingRepository.save(newBooking);
        return savedBooking;
    }

    @Transactional
    public void deleteBooking(Booking booking) throws DataAccessException {
        bookingRepository.delete(booking);
    }
    
}
