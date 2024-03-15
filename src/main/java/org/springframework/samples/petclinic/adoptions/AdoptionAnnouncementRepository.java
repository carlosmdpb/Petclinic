package org.springframework.samples.petclinic.adoptions;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.samples.petclinic.owner.Owner;

public interface AdoptionAnnouncementRepository extends CrudRepository<AdoptionAnnouncement,Integer>{
    
    @Query("SELECT a FROM AdoptionAnnouncement a WHERE a.alreadyAdopted = false")
	public List<AdoptionAnnouncement> findAllNotAdopted();

	@Query("SELECT a FROM AdoptionAnnouncement a WHERE a.alreadyAdopted = true")
	public List<AdoptionAnnouncement> findAllAdopted();

	@Query("select o from Owner o where o.user.username = :username")
	public Owner findOwnerByUsername(String username);

	@Query("SELECT a FROM AdoptionAnnouncement a WHERE a.pet.id = :petId")
	public AdoptionAnnouncement findAdoptionaAnnouncementByPetId(int petId);
}
