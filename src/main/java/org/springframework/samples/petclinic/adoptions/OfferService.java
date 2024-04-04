package org.springframework.samples.petclinic.adoptions;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.owner.Owner;
import org.springframework.samples.petclinic.owner.OwnerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service
public class OfferService {

    private OfferRepository offerRepository;
    private OwnerService ownerService;
    private AdoptationService adoptationService;


    public OfferService(OfferRepository offerRepository, OwnerService ownerService, AdoptationService adoptationService) {
        this.offerRepository = offerRepository;
        this.ownerService = ownerService;
        this.adoptationService = adoptationService;
    }

    @Transactional(readOnly = true)
    public Offer findOfferById(int offerId) throws DataAccessException {
    Optional<Offer> offerOptional = offerRepository.findById(offerId);
    
    if (offerOptional.isPresent()) {
        return offerOptional.get();
    } else {
        throw new NoSuchElementException("Offer not found for ID: " + offerId);
    }
}


    @Transactional
    public List<Offer> findAll() throws DataAccessException {
        return offerRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Adoptation> findAllAdoptationNotOffered(Integer userId) throws DataAccessException {
        List<Adoptation> all = adoptationService.findAll();
        List<Offer> allOffers = offerRepository.findAll();
        for(Offer offer : allOffers){
            if(offer.getOfferingOwner().getUser().getId().equals(userId)){
                all.remove(offer.getAdoptation());
            }
        }

        for(Adoptation adoptation : all){
            if(adoptation.getOwner().getUser().getId().equals(userId)){
                all.remove(adoptation);
                if(all.size() == 0){
                    return new ArrayList<>();
                }
            }
            if(adoptation.getIsAccepted() == true){
                all.remove(adoptation);
                if(all.size() == 0){
                    return new ArrayList<>();
                }
            }
        }
        return all;
    }

    @Transactional(readOnly = true)
    public List<Offer> findAllOffersByUserId(Integer userId) throws DataAccessException {
        List<Offer> all = offerRepository.findAll();
        List<Offer> res = new ArrayList<>();
        for(Offer offer : all){
            if(offer.getOfferingOwner().getUser().getId().equals(userId)){
                res.add(offer);
            }
        }
        return res;
    }

    @Transactional(readOnly = true)
    public List<Offer> findAllOffersReceived(Integer userId) throws DataAccessException {
        List<Offer> all = offerRepository.findAll();
        List<Offer> res = new ArrayList<>();
        for(Offer offer : all){
            if(offer.getAdoptation().getOwner().getUser().getId().equals(userId) && offer.getStatus().equals(AdoptationStatus.PENDING)){
                res.add(offer);
            }
        }
        return res;
    }

    public Offer createOffer(OfferDTO offerDTO) throws DataAccessException {
    Offer offer = new Offer();
    Optional<Owner> ownerOptional = ownerService.optFindOwnerByUser(offerDTO.getOfferingOwnerUserId());
    
    if (ownerOptional.isPresent()) {
        offer.setOfferingOwner(ownerOptional.get());
        offer.setStatus(AdoptationStatus.PENDING);
        offer.setDescription(offerDTO.getDescription());
        offer.setAdoptation(adoptationService.findAdoptationById(offerDTO.getAdoptationId()));
        return offerRepository.save(offer);
    } else {
        
        throw new NoSuchElementException("Owner not found for user ID: " + offerDTO.getOfferingOwnerUserId());
    }
}





    @Transactional
    public Offer updateOffer(String status, Integer offerId) throws DataAccessException {
        Offer offer = findOfferById(offerId);
        offer.setStatus(AdoptationStatus.valueOf(status));
        if(status.equals("ACCEPTED")){
            offer.setStatus(AdoptationStatus.ACCEPTED);
            offer.getAdoptation().getPet().setOwner(offer.getOfferingOwner());
            offer.getAdoptation().setIsAccepted(true);
            rejectAllOffersExcept1(offer);
        }else{
            offer.setStatus(AdoptationStatus.REJECTED);
        }
        saveOffer(offer);
        return offer;
    }

    @Transactional
    public void rejectAllOffersExcept1(Offer offer) throws DataAccessException{
        List<Offer> all = offerRepository.findAll();
        for(Offer o : all){
            if(o.getAdoptation().getId().equals(offer.getAdoptation().getId()) && !o.getId().equals(offer.getId())){
                o.setStatus(AdoptationStatus.REJECTED);
                saveOffer(o);
            }
        }
    }


    @Transactional
    public void saveOffer(Offer offer) throws DataAccessException {
        offerRepository.save(offer);
    }

    @Transactional
    public void deleteOffer(Offer offer) throws DataAccessException {
        offerRepository.delete(offer);
    }

    @Transactional
    public void deleteAdoptation(Adoptation adoptation) throws DataAccessException {
        List<Offer> all = offerRepository.findAll();
        for(Offer offer : all){
            if(offer.getAdoptation().getId().equals(adoptation.getId())){
                deleteOffer(offer);
            }
        }
        adoptationService.deleteAdoptation(adoptation);
    }

}
