package org.springframework.samples.petclinic.pethotelroom;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.auth.payload.response.MessageResponse;
import org.springframework.samples.petclinic.util.RestPreconditions;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/petHotelRooms")
@Tag(name = "Pet Hotel Rooms", description = "The Pet Hotel Rooms management API")
@SecurityRequirement(name = "bearerAuth")
public class PetHotelRoomRestController {
    private final PetHotelRoomService petHotelRoomService;

    @Autowired
    public PetHotelRoomRestController(PetHotelRoomService petHotelRoomService) {

        this.petHotelRoomService = petHotelRoomService;
    }

    @GetMapping
    public ResponseEntity<List<PetHotelRoom>> findAllPetHotelRooms(@RequestParam(required = false) Integer userId) {

        if (userId != null) {
            return new ResponseEntity<>(petHotelRoomService.findPetHotelRoomsByUserId(userId), HttpStatus.OK);
        }

        return new ResponseEntity<>(petHotelRoomService.findAll(), HttpStatus.OK);
    }

    @GetMapping(value = "{petHotelRoomId}")
    public ResponseEntity<PetHotelRoom> findpetHotelRoomById(@PathVariable("petHotelRoomId") int petHotelRoomId) {
        return new ResponseEntity<>(petHotelRoomService.findPetHotelRoomById(petHotelRoomId),
                HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PetHotelRoom> createPetHotelRoom(@RequestBody @Valid PetHotelRoomDTO petHotelRoomDTO) {

        PetHotelRoom newPetHotelRoom = petHotelRoomService.createFromDTO(petHotelRoomDTO);

        return new ResponseEntity<>(petHotelRoomService.save(newPetHotelRoom), HttpStatus.CREATED);
    }

    @PutMapping(value = "{petHotelRoomId}")
    public ResponseEntity<PetHotelRoom> updatePetHotelRoom(@PathVariable("petHotelRoomId") int petHotelRoomId,
            @RequestBody @Valid PetHotelRoomDTO petHotelRoomDTO) {

        PetHotelRoom updatedPetHotelRoom = petHotelRoomService.updateFromDTO(petHotelRoomId, petHotelRoomDTO);

        return new ResponseEntity<>(petHotelRoomService.save(updatedPetHotelRoom), HttpStatus.OK);
    }

    @DeleteMapping(value = "{petHotelRoomId}")
    public ResponseEntity<MessageResponse> deletePetHotelRoom(@PathVariable("petHotelRoomId") int petHotelRoomId) {
        RestPreconditions.checkNotNull(petHotelRoomService.findPetHotelRoomById(petHotelRoomId),
                "PetHotelRoom", "ID", petHotelRoomId);
        petHotelRoomService.delete(petHotelRoomId);
        return new ResponseEntity<>(new MessageResponse("Pet Hotel Room deleted!"),
                HttpStatus.OK);
    }
     @PostMapping(value = "{petHotelRoomId}/bookings")
     public ResponseEntity<MessageResponse> bookRoom(@PathVariable("petHotelRoomId") int petHotelRoomId,
                                                     @RequestParam int petId,
                                                     @RequestParam String startDate,
                                                     @RequestParam String endDate) {
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        petHotelRoomService.bookRoom(petHotelRoomId, petId, start, end);
        return new ResponseEntity<>(new MessageResponse("Room booked successfully!"), HttpStatus.OK);
    }
}
