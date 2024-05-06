package org.springframework.samples.petclinic.request;

import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface RequestRepository extends CrudRepository<Request, Integer> {

	@Query("SELECT r FROM Request r WHERE r.clinicOwner.id = :clinicOwnerId ORDER BY r.creationDate DESC")
	public List<Request> findRequestsByClinicOwner(@Param("clinicOwnerId") int clinicOwnerId);

	@SuppressWarnings("null")
	@Query("SELECT r FROM Request r ORDER BY r.clinicOwner.id ASC, r.creationDate DESC")
	public List<Request> findAll();
}