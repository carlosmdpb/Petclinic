package org.springframework.samples.petclinic.hotel;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.samples.petclinic.exceptions.AccessDeniedException;
import org.springframework.samples.petclinic.user.User;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hotel")
@SecurityRequirement(name = "bearerAuth")
public class HotelController {
    @Autowired
    private HotelService hotelService;
    @Autowired
    private UserService userService;
	private static final String ADMIN_AUTH = "ADMIN";
	private static final String CLINIC_OWNER_AUTH = "CLINIC_OWNER";

    @PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Hotel> create(@RequestBody @Valid Hotel hotel)throws DataAccessException {
        User user = userService.findCurrentUser();
        Hotel newHotel = new Hotel();
		Hotel savedHotel;
        BeanUtils.copyProperties(hotel, newHotel, "id");
        if (user.hasAnyAuthority(CLINIC_OWNER_AUTH).equals(true) || user.hasAnyAuthority(ADMIN_AUTH).equals(true)) {
            savedHotel = hotelService.crearHotel(newHotel);
            
        }else{
            throw new AccessDeniedException("No tienes permisos para realizar esta acción");
        }
		return new ResponseEntity<>(savedHotel, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Hotel>> getAll() {       
        User user = userService.findCurrentUser();
 		List<Hotel> res = null;
         if (user.hasAnyAuthority(ADMIN_AUTH).equals(true) || user.hasAnyAuthority(CLINIC_OWNER_AUTH).equals(true)) {
            res= hotelService.findAllHotel();
         }else {
            throw new AccessDeniedException("No tienes permisos para realizar esta acción");
        }
		return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
