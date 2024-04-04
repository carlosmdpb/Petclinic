package org.springframework.samples.petclinic.booking;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.exceptions.AccessDeniedException;
import org.springframework.samples.petclinic.pethotelroom.PetHotelRoom;
import org.springframework.samples.petclinic.pethotelroom.PetHotelRoomDTO;
import org.springframework.samples.petclinic.user.User;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/booking")
@SecurityRequirement(name = "bearerAuth")
public class BookingController {

    private static final String NOT_ALLOWED = "No tienes permisos para realizar esta acción";

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    private static final String OWNER = "OWNER";

    /*
    @GetMapping
    public ResponseEntity<Iterable<Booking>> getAllBookings() throws DataAccessException {
        
        User user = userService.findCurrentUser();
        Iterable<Booking> res = null;
        if(user.hasAnyAuthority(OWNER).equals(true)){
            res = bookingService.findAllBookings();
        }else{
            throw new AccessDeniedException("No tienes permisos para realizar esta acción");
        }
        return new ResponseEntity<Iterable<Booking>>(res, HttpStatus.OK);
    }
    */
    @GetMapping
    public ResponseEntity<Iterable<BookingDTO>> getAllBookings() throws DataAccessException {
        User user = userService.findCurrentUser();
        Iterable<Booking> bookings = null;
        if(user.hasAnyAuthority(OWNER).equals(true)){
            bookings = bookingService.findAllBookings();
        }else{
            throw new AccessDeniedException(NOT_ALLOWED);
        }
    
        List<BookingDTO> bookingDTOs = StreamSupport.stream(bookings.spliterator(), false)
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    
        return new ResponseEntity<>(bookingDTOs, HttpStatus.OK);
    }


    public BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        dto.setPet(booking.getPet().getName());
        dto.setHotel(booking.getRoom().getName());
        return dto;
    }


    @GetMapping("/rooms")
    public ResponseEntity<List<PetHotelRoom>> getAllRooms() throws DataAccessException {
        return new ResponseEntity<>(bookingService.findAllHotelRooms(), HttpStatus.OK);
    }

    public PetHotelRoomDTO convertToDTO(PetHotelRoom petHotelRoom) {
        PetHotelRoomDTO dto = new PetHotelRoomDTO();
        dto.setName(petHotelRoom.getName());
        dto.setType(petHotelRoom.getAllowedPetType().getName());
        return dto;
    }
    
    @GetMapping("/rooms/dto")
    public ResponseEntity<List<PetHotelRoomDTO>> getAllRoomsDTO() throws DataAccessException {
        User user = userService.findCurrentUser();
        List<PetHotelRoom> rooms = null;
        if(user.hasAnyAuthority(OWNER).equals(true)){
            rooms = bookingService.findAllHotelRooms();
        }else{
            throw new AccessDeniedException(NOT_ALLOWED);
        }
        List<PetHotelRoomDTO> roomDTOs = rooms.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    
        return new ResponseEntity<>(roomDTOs, HttpStatus.OK);
    }

    @GetMapping("/rooms/{name}")
    public PetHotelRoom convertToEntity(@PathVariable String name) {
        return bookingService.findRoomByName(name);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Booking> createBooking(@RequestBody @Valid Booking booking) throws DataAccessException {
        User user = userService.findCurrentUser();
        Booking newBooking = new Booking();
        Booking savedBooking;
        BeanUtils.copyProperties(booking, newBooking, "id");
        if(user.hasAnyAuthority(OWNER).equals(true)){
            savedBooking = bookingService.createBooking(newBooking);
        }else{
            throw new AccessDeniedException(NOT_ALLOWED);
        }
        return new ResponseEntity<Booking>(savedBooking, HttpStatus.CREATED);
    }
    
}
