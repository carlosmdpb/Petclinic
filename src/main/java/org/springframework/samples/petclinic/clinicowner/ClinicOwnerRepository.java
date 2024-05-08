package org.springframework.samples.petclinic.clinicowner;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.samples.petclinic.clinic.PricingPlan;

public interface ClinicOwnerRepository extends CrudRepository<ClinicOwner, Integer> {

    @Query("SELECT clinicOwner FROM ClinicOwner clinicOwner WHERE clinicOwner.user.id = :userId")
    Optional<ClinicOwner> findByUserId(int userId);

    @Query("SELECT c.plan FROM ClinicOwner co JOIN co.clinics c WHERE co = :clinicOwner")
    Set<PricingPlan> findClinicOwnerPlans(@Param("clinicOwner") ClinicOwner clinicOwner);

}
