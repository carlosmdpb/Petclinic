/*
 * Copyright 2002-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.samples.petclinic.user;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import jakarta.security.auth.message.AuthException;
import jakarta.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.samples.petclinic.clinicowner.ClinicOwner;
import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;
import org.springframework.samples.petclinic.owner.Owner;
import org.springframework.samples.petclinic.owner.OwnerService;
import org.springframework.samples.petclinic.vet.Vet;
import org.springframework.samples.petclinic.vet.VetService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

	private UserRepository userRepository;

	private VetService vetService;

	private OwnerService ownerService;

	@Autowired
	public UserService(UserRepository userRepository, VetService vetService) {
		this.userRepository = userRepository;
		this.vetService = vetService;
	}

	@Transactional
	public User saveUser(User user) throws DataAccessException {
		userRepository.save(user);
		return user;
	}

	@Transactional(readOnly = true)
	public User findUser(String username) {
		return userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User", "username", username));
	}

	@Transactional(readOnly = true)
	public User findUser(Integer id) {
		return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
	}

	@Transactional(readOnly = true)
	public Owner findOwnerByUser(String username) {
		return userRepository.findOwnerByUser(username)
				.orElseThrow(() -> new ResourceNotFoundException("Owner", "username", username));
	}

	@Transactional(readOnly = true)
	public Vet findVetByUser(int userId) {
		return userRepository.findVetByUser(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Vet", "id", userId));
	}

	@Transactional(readOnly = true)
	public Owner findOwnerByUser(int id) {
		return userRepository.findOwnerByUser(id).orElseThrow(() -> new ResourceNotFoundException("Owner", "ID", id));
	}

	@Transactional(readOnly = true)
	public User findCurrentUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth == null)
			throw new ResourceNotFoundException("Nobody authenticated!");
		else
			return userRepository.findByUsername(auth.getName())
					.orElseThrow(() -> new ResourceNotFoundException("User", "Username", auth.getName()));
	}

	public Boolean existsUser(String username) {
		return userRepository.existsByUsername(username);
	}

	@Transactional(readOnly = true)
	public Iterable<User> findAll() {
		return userRepository.findAll();
	}

	public Iterable<User> findAllByAuthority(String auth) {
		return userRepository.findAllByAuthority(auth);
	}

	@Transactional
	public User updateUser(@Valid User user, Integer idToUpdate) {
		User toUpdate = findUser(idToUpdate);
		BeanUtils.copyProperties(user, toUpdate, "id");
		userRepository.save(toUpdate);

		return toUpdate;
	}

	@Transactional
	public void deleteUser(Integer id) {
		User toDelete = findUser(id);
		deleteRelations(id, toDelete.getAuthority().getAuthority());

		this.userRepository.delete(toDelete);
	}

	private void deleteRelations(Integer id, String auth) {
		switch (auth) {
		case "OWNER":

			this.userRepository.deleteOwnerRelation(id);
			break;
		case "VET":
			Optional<Vet> vet = vetService.optFindVetByUser(id);
			if (vet.isPresent()) {
				vetService.deleteVet(vet.get().getId());
			}
			break;
		default:
			break;
		}

	}

	    public ClinicOwner findClinicOwnerByUser(Integer id) {
		return userRepository.findClinicOwnerByUser(id).orElseThrow(() -> new ResourceNotFoundException("Owner", "ID", id));
    }

	public Map<String,Object> findUserContext(){
		User user = this.findCurrentUser();
		Owner owner = this.findOwnerByUser(user.getId());
		return ownerService.findOwnerContext(owner, user.getUsername());

	}

	public String findUserPlan() throws AuthException{
		User user = null;
		String s="";
		try{
			user = findCurrentUser();
		}catch(ResourceNotFoundException e){
			System.out.println("User not found");
			return null;
		}
		switch (user.getAuthority().getAuthority()) {
			case "OWNER":
				Owner owner = findOwnerByUser(user.getId());
				s= owner.getClinic().getPlan().toString();	
			case "VET":
				Vet vet = findVetByUser(user.getId());
				s = vet.getClinic().getPlan().toString();

		}
		return s;
	}


}
