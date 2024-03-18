package org.springframework.samples.petclinic.pethotelroom;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.clinic.Clinic;
import org.springframework.samples.petclinic.clinic.ClinicService;
import org.springframework.samples.petclinic.pet.PetService;
import org.springframework.samples.petclinic.pet.PetType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PetHotelRoomService {

    private PetService petService;
    private PetHotelRoomRepository petHotelRoomRepository;
    private ClinicService clinicService;

    @Autowired
    public PetHotelRoomService(PetHotelRoomRepository petHotelRoomRepository, PetService petService,
            ClinicService clinicService) {
        this.petHotelRoomRepository = petHotelRoomRepository;
        this.petService = petService;
        this.clinicService = clinicService;
    }

    @Transactional(readOnly = true)
    public List<PetHotelRoom> findAll() throws DataAccessException {
        return (List<PetHotelRoom>) petHotelRoomRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<PetHotelRoom> findPetHotelRoomsByUserId(int userId) throws DataAccessException {
        return petHotelRoomRepository.findPetHotelRoomsByUserId(userId);
    }

    @Transactional(readOnly = true)
    public PetHotelRoom findPetHotelRoomById(int petHotelRoomId) throws DataAccessException {
        return petHotelRoomRepository.findById(petHotelRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("PetHotelRoom", "ID", petHotelRoomId));
    }

    @Transactional
    public PetHotelRoom save(PetHotelRoom petHotelRoom) throws DataAccessException {
        petHotelRoomRepository.save(petHotelRoom);
        return petHotelRoom;
    }

    @Transactional
    public PetHotelRoom update(PetHotelRoom petHotelRoom, int petHotelRoomId) throws DataAccessException {
        PetHotelRoom petHotelRoomToUpdate = petHotelRoomRepository.findById(petHotelRoomId).get();
        BeanUtils.copyProperties(petHotelRoom, petHotelRoomToUpdate, "id");
        return save(petHotelRoomToUpdate);
    }

    @Transactional
    public void delete(int petHotelRoomId) throws DataAccessException {
        petHotelRoomRepository.deleteById(petHotelRoomId);
    }

    @Transactional
    public PetHotelRoom createFromDTO(PetHotelRoomDTO petHotelRoomDTO) {
        PetHotelRoom res = new PetHotelRoom();
        res.setName(petHotelRoomDTO.getName());
        PetType petType = petService.findPetTypeByName(petHotelRoomDTO.getType());
        res.setAllowedPetType(petType);
        res.setSize(petHotelRoomDTO.getSize());
        List<Clinic> clinics = clinicService.findAll();
        for (Clinic clinic : clinics) {
            if (clinic.getName().equals(petHotelRoomDTO.getClinic())) {
                res.setClinic(clinic);
                break;
            }
        }

        return res;
    }

    @Transactional
    public PetHotelRoom updateFromDTO(Integer id, PetHotelRoomDTO petHotelRoomDTO) {
        PetHotelRoom res = findPetHotelRoomById(id);
        res.setName(petHotelRoomDTO.getName());
        PetType petType = petService.findPetTypeByName(petHotelRoomDTO.getType());
        res.setAllowedPetType(petType);
        res.setSize(petHotelRoomDTO.getSize());
        List<Clinic> clinics = clinicService.findAll();
        for (Clinic clinic : clinics) {
            if (clinic.getName().equals(petHotelRoomDTO.getClinic())) {
                res.setClinic(clinic);
                break;
            }
        }

        return res;
    }

}
