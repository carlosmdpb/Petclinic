package org.springframework.samples.petclinic.booking;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.booking.Booking;
import org.springframework.samples.petclinic.booking.BookingRepository;
import org.springframework.samples.petclinic.pet.Pet;
import org.springframework.samples.petclinic.pet.PetType;
import org.springframework.samples.petclinic.pethotelroom.PetHotelRoom;
import org.springframework.samples.petclinic.pethotelroom.PetHotelRoomRepository;

public class BookingServiceTest {

    @Mock
    private PetHotelRoomRepository petHotelRoomRepository;

    @Mock
    private BookingRepository bookingRepository;

    @InjectMocks
    private BookingService bookingService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        PetHotelRoom room = new PetHotelRoom(); // Asumiendo que la clase Room existe.
        Pet pet = new Pet(); // Asumiendo que la clase Pet existe.
        Booking booking = new Booking();
        booking.setStartDate(LocalDate.now());
        booking.setEndDate(LocalDate.now().plusDays(1));
        booking.setRoom(room);
        booking.setPet(pet);
    }

    @Test
    public void testFindBookingById() {
        // Arrange
        int bookingId = 1;
        Booking booking = new Booking();
        when(bookingRepository.findById(bookingId)).thenReturn(Optional.of(booking));

        // Act
        Booking foundBooking = bookingService.findBookingById(bookingId);

        // Assert
        assertNotNull(foundBooking);
        assertEquals(booking, foundBooking);
    }

    @Test
    public void testFindBookingById_NotFound() {
        // Arrange
        int bookingId = 1;
        when(bookingRepository.findById(bookingId)).thenReturn(Optional.empty());

        // Act
        Booking foundBooking = bookingService.findBookingById(bookingId);

        // Assert
        assertNull(foundBooking);
    }

    @Test
    public void testFindAllBookings() {
        // Arrange
        List<Booking> bookings = new ArrayList<>();
        bookings.add(new Booking());
        when(bookingRepository.findAll()).thenReturn(bookings);

        // Act
        Iterable<Booking> foundBookings = bookingService.findAllBookings();

        // Assert
        assertNotNull(foundBookings);
        assertEquals(bookings, foundBookings);
    }

    @Test
    public void testFindAllHotelRooms() {
        // Arrange
        List<PetHotelRoom> rooms = new ArrayList<>();
        rooms.add(new PetHotelRoom());
        when(petHotelRoomRepository.findAll()).thenReturn(rooms);

        // Act
        List<PetHotelRoom> foundRooms = bookingService.findAllHotelRooms();

        // Assert
        assertNotNull(foundRooms);
        assertEquals(rooms, foundRooms);
    }

    @Test
    public void testCreateBooking_Failure_StartDateAfterEndDate() {
        // Arrange
        Booking booking = new Booking();
        booking.setStartDate(LocalDate.now().plusDays(7));
        booking.setEndDate(LocalDate.now());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> bookingService.createBooking(booking));
    }

    @Test
    public void createBooking_Successful() throws DataAccessException {
        // Asumir que todas las validaciones son exitosas
        when(bookingRepository.checkAvailability(any(PetHotelRoom.class), any(LocalDate.class), any(LocalDate.class))).thenReturn(true);
        when(bookingRepository.checkIsPetAllowed(any(PetHotelRoom.class), any(PetType.class))).thenReturn(false);
        when(bookingRepository.checkPetBookingOverlap(any(Pet.class), any(LocalDate.class), any(LocalDate.class))).thenReturn(true);
        when(bookingRepository.save(any(Booking.class))).thenReturn(new Booking());
        Booking booking = new Booking();
        booking.setStartDate(LocalDate.now());
        booking.setEndDate(LocalDate.now().plusDays(1));
        booking.setRoom(new PetHotelRoom()); // Assuming PetHotelRoom has a no-arg constructor or you have another way to instantiate it.
        booking.setPet(new Pet()); // Assuming
        Booking savedBooking = bookingService.createBooking(booking);
        assertNotNull(savedBooking);
        verify(bookingRepository).save(any(Booking.class));
    }

    @Test
    public void createBooking_RoomNotAvailable() {
        // Arrange
        when(bookingRepository.checkAvailability(any(PetHotelRoom.class), any(LocalDate.class), any(LocalDate.class))).thenReturn(false);
        when(bookingRepository.save(any(Booking.class))).thenReturn(new Booking());
        Booking booking = new Booking();
        booking.setStartDate(LocalDate.now());
        booking.setEndDate(LocalDate.now().plusDays(1));
        booking.setRoom(new PetHotelRoom()); // Assuming PetHotelRoom has a no-arg constructor or you have another way to instantiate it.
        booking.setPet(new Pet()); // Assuming
        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            bookingService.createBooking(booking);
        });
    }

    @Test
    public void createBooking_PetNotAllowedOrOverlap() {
        // Arrange
        when(bookingRepository.checkIsPetAllowed(any(PetHotelRoom.class), any(PetType.class))).thenReturn(true);
        when(bookingRepository.checkPetBookingOverlap(any(Pet.class), any(LocalDate.class), any(LocalDate.class))).thenReturn(false);
        when(bookingRepository.save(any(Booking.class))).thenReturn(new Booking());
        Booking booking = new Booking();
        booking.setStartDate(LocalDate.now());
        booking.setEndDate(LocalDate.now().plusDays(1));
        booking.setRoom(new PetHotelRoom()); // Assuming PetHotelRoom has a no-arg constructor or you have another way to instantiate it.
        booking.setPet(new Pet()); // Assuming
        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> {
            bookingService.createBooking(booking);
        });
    }

    @Test
    public void createBooking_PetTypeNotAllowed() {
        // Arrange
        when(bookingRepository.checkIsPetAllowed(any(PetHotelRoom.class), any(PetType.class))).thenReturn(true);
        Booking booking = new Booking();
        booking.setStartDate(LocalDate.now());
        booking.setEndDate(LocalDate.now().plusDays(1));
        booking.setRoom(new PetHotelRoom()); // Assuming PetHotelRoom has a no-arg constructor or you have another way to instantiate it.
        booking.setPet(new Pet()); // Assuming
        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> bookingService.createBooking(booking));
    }

    @Test
    public void testDeleteBooking() {
        // Arrange
        Booking booking = new Booking();

        // Act
        bookingService.deleteBooking(booking);

        // Assert
        verify(bookingRepository, times(1)).delete(booking);
    }
}
