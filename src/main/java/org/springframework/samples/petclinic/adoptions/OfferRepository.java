package org.springframework.samples.petclinic.adoptions;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface OfferRepository extends CrudRepository<Offer, Integer>{

    public List<Offer> findAll();

}
