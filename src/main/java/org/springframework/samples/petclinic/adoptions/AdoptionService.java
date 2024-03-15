package org.springframework.samples.petclinic.adoptions;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.owner.Owner;
import org.springframework.samples.petclinic.pet.Pet;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class AdoptionService {
    
    private AdoptionAnnouncementRepository aAnnouncementRepo;
    private AdoptionRequestRepository aRequestRepo;

    @Autowired
    public AdoptionService(AdoptionAnnouncementRepository aAnnouncementRepo,AdoptionRequestRepository aRequestRepo){
        this.aAnnouncementRepo=aAnnouncementRepo;
        this.aRequestRepo=aRequestRepo;
    }

    @Transactional(readOnly = true)
    public Iterable<AdoptionAnnouncement> findAllAdoptionAnnouncements() {
        return aAnnouncementRepo.findAll();
    }

    @Transactional(readOnly = true)
    public Iterable<AdoptionRequest> findAllAdoptionRequests() {
        return aRequestRepo.findAll();
    }

    @Transactional(readOnly = true)
    public AdoptionAnnouncement findAdoptionAnnouncementById(Integer id){
        return aAnnouncementRepo.findById(id).get();
    }

    @Transactional(readOnly = true)
    public List<AdoptionAnnouncement> findAllNotAdopted(){
        return aAnnouncementRepo.findAllNotAdopted();
    }

    @Transactional(readOnly = true)
    public List<AdoptionAnnouncement> findAllAdopted(){
        return aAnnouncementRepo.findAllAdopted();
    }

    @Transactional
	public Owner findOwnerByUsername(String username){
		return aAnnouncementRepo.findOwnerByUsername(username);
	}

    @Transactional
	public void saveAnnouncement(AdoptionAnnouncement a){
		aAnnouncementRepo.save(a);
	}

	@Transactional
	public void saveRequest(AdoptionRequest a){
		aRequestRepo.save(a);
	}

    @Transactional
	public AdoptionAnnouncement findAdoptionaAnnouncementByPetId(int petId){
		return aAnnouncementRepo.findAdoptionaAnnouncementByPetId(petId);
	}

	@Transactional
	public AdoptionRequest findRequestById(int id){
		return aRequestRepo.findById(id).get();
	}

    @Transactional
	public void acceptRequest(AdoptionRequest ar){
		AdoptionAnnouncement an = ar.getAdoptionAnnouncement();
		Pet pet = an.getPet();
		pet.setOwner(ar.getOwner());
		an.setAlreadyAdopted(Boolean.TRUE);
	}

	@Transactional
	public List<AdoptionRequest> findAllAdoptionRequestByAnnouncementId(int id){
		return aRequestRepo.findByannouncementId(id);
	}

	@Transactional(readOnly = true)
    public Integer countAdoptionAnnouncementsByClinicAndDate(Integer clinicId) {
        return aRequestRepo.countAdoptionAnnouncementsByClinicAndDate(clinicId, LocalDate.now().getMonthValue(), LocalDate.now().getYear());
    }
}
