package org.springframework.samples.petclinic.adoptions;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdoptionRequestRepository extends CrudRepository<AdoptionRequest,Integer>{
    
    @Query("select a from AdoptionRequest a where a.adoptionAnnouncement.id = :id")
    public List<AdoptionRequest> findByannouncementId(int id);
    
    @Query("select count(a) from AdoptionAnnouncement a where a.clinic.id = :clinicId and MONTH(a.adoptionPublicationDate) = :month and YEAR(a.adoptionPublicationDate) = :year")
    public Integer countAdoptionAnnouncementsByClinicAndDate(Integer clinicId, Integer month, Integer year);
}
