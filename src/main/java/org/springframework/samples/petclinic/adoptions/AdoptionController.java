package org.springframework.samples.petclinic.adoptions;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.samples.petclinic.owner.Owner;
import org.springframework.samples.petclinic.pet.Pet;
import org.springframework.samples.petclinic.pet.PetService;
import org.springframework.samples.petclinic.user.User;
import org.springframework.samples.petclinic.user.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/adoptions")
public class AdoptionController {
    
    private final AdoptionService adoptionService;
    private final UserService userService;
    private final PetService petService;

    @Autowired
    public AdoptionController(AdoptionService adoptionService,UserService userService,PetService petService){
        this.adoptionService = adoptionService;
        this.petService = petService;
        this.userService=userService;
    }

    @GetMapping
    public String listAvailable(Model model){
        model.addAttribute("adoptions", adoptionService.findAllNotAdopted());
        return "adoptions/availableAdoptions";
    }

    @GetMapping("/adopted")
    public String listAdopted(Model model){
        model.addAttribute("adoptions", adoptionService.findAllAdopted());
        return "adoptions/adopted";
    }

    @GetMapping("/new")
    public String newAnnouncement(Model model){
        User currentUser = userService.findCurrentUser();
        List<Pet> userPets = petService.findAllPetsByUserId(currentUser.getId());
        if(userPets.size()==0){
            model.addAttribute("messageType", "danger");
            model.addAttribute("message", "You are not an owner of any pet");
            return "welcome";
        } else{
            model.addAttribute("pets", userPets);
            AdoptionAnnouncement an=new AdoptionAnnouncement();
            an.setAdoptionPublicationDate(LocalDate.now());
            an.setOwner(userPets.get(0).getOwner());
            model.addAttribute("newAdoption", an);
            return "adoptions/createAdoptionsAnnouncement";
        }
    }

    @PostMapping("/new")
    public String newAnnouncementPost(@ModelAttribute("newAdoptionAnnouncement") @Valid AdoptionAnnouncement adoption,Model model){
        User currentUser = userService.findCurrentUser();
        AdoptionAnnouncement aA = adoptionService.findAdoptionaAnnouncementByPetId(adoption.getPet().getId());
        if (currentUser.getUsername().equals(adoption.getPet().getOwner().getUser().getUsername()) && !(aA instanceof AdoptionAnnouncement)){

            adoption.setOwner(adoptionService.findOwnerByUsername(currentUser.getUsername()));
            adoption.setAlreadyAdopted(Boolean.FALSE);
            adoptionService.saveAnnouncement(adoption);;
        }
        model.addAttribute("adoptions", adoptionService.findAllNotAdopted());
        return "adoptions/availableAdoptions";
    }

    @GetMapping("/{id}")
    public String show(Model model, @PathVariable("id") int id){
        AdoptionAnnouncement aA = adoptionService.findAdoptionAnnouncementById(id);
        User currentUser = userService.findCurrentUser();

        model.addAttribute("an", aA);
        model.addAttribute("requests", adoptionService.findAllAdoptionRequestByAnnouncementId(id));
        model.addAttribute("owner", aA.getOwner());
        model.addAttribute("pet", aA.getPet());
        model.addAttribute("isOwner", aA.getOwner().getUser().getUsername().equals(currentUser.getUsername()));
        return "adoptions/adoptionDetails";
    }

    @GetMapping("/{id}/new-request")
    public String request(Model model, @PathVariable("id") int id){
        AdoptionAnnouncement aA = adoptionService.findAdoptionAnnouncementById(id);
        if(aA.getAlreadyAdopted()){
            model.addAttribute("messageType", "danger");
            model.addAttribute("message", "Pet was already adopted");
            return "welcome";
        } else{
            model.addAttribute("newRequest", new AdoptionRequest());
            return "adoptions/createRequest";
        }
    }

    @PostMapping("/{aid}/new-request")
    public String createRequest(@ModelAttribute("newRequest") @Valid AdoptionRequest r, @PathVariable("aid") int aid){
        User currentUser = userService.findCurrentUser();
        Owner owner = adoptionService.findOwnerByUsername(currentUser.getUsername());
        AdoptionAnnouncement an = adoptionService.findAdoptionAnnouncementById(aid);
        if(owner instanceof Owner && currentUser.getUsername() != an.getOwner().getUser().getUsername() && !an.getAlreadyAdopted()){
            r.setOwner(owner);
            r.setAdoptionAnnouncement(an);
            adoptionService.saveRequest(r);
        }
        
        return "redirect:/adoptions/"+aid;
    }

    @GetMapping("/{aid}/requests/{rid}/accept")
    public String accept(@PathVariable("aid") int aid, @PathVariable("rid") int rid, Model model, RedirectAttributes r){
        User currentUser = userService.findCurrentUser();
        AdoptionAnnouncement an = adoptionService.findAdoptionAnnouncementById(aid);
        AdoptionRequest ar = adoptionService.findRequestById(rid);

        if(an.getOwner().getUser().getUsername().equals(currentUser.getUsername()) && !an.getAlreadyAdopted()){
            adoptionService.acceptRequest(ar);
            r.addFlashAttribute("messageType", "info");
            r.addFlashAttribute("message", "Your pet has been given in adoption!");
        }

        return "redirect:/adoptions/"+aid;
    }

}
