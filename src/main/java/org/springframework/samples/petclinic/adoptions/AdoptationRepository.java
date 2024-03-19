package org.springframework.samples.petclinic.adoptions;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface AdoptationRepository extends CrudRepository<Adoptation, Integer> {

    public List<Adoptation> findAll();

    public List<Adoptation> findByPetId(int petId);
}
