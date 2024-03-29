package org.springframework.samples.petclinic.adoptions;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.owner.Owner;
import org.springframework.samples.petclinic.pet.Pet;
import org.springframework.samples.petclinic.pet.PetService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdoptationService {

    private AdoptationRepository adoptationRepository;
    private PetService petService;


    public AdoptationService(AdoptationRepository adoptationRepository,
            PetService petService) {
        this.adoptationRepository = adoptationRepository;
        this.petService = petService;
    }

    @Transactional(readOnly = true)
    public List<Adoptation> findAll() throws DataAccessException {
        return adoptationRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Adoptation findAdoptationById(int adoptationId) throws DataAccessException {
        return adoptationRepository.findById(adoptationId).get();
    }

    @Transactional
    public List<Adoptation> findAdoptationByPetId(Integer petId) throws DataAccessException {
        return adoptationRepository.findByPetId(petId);
    }

    @Transactional
    public Adoptation createAdoptation(Integer petId) throws DataAccessException {
        Adoptation adoptation = new Adoptation();
        Pet pet = petService.findPetById(petId);
        Owner owner = pet.getOwner();
        adoptation.setOwner(owner);
        adoptation.setPet(pet);
        adoptation.setIsAccepted(false);

        return adoptationRepository.save(adoptation);
    }


    @Transactional
    public void saveAdoptation(Adoptation adoptation) throws DataAccessException {
        adoptationRepository.save(adoptation);
    }

    @Transactional
    public void deleteAdoptation(Adoptation adoptation) throws DataAccessException {

        adoptationRepository.delete(adoptation);
    }






}
