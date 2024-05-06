package org.springframework.samples.petclinic.request;


import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import org.springframework.samples.petclinic.exceptions.ResourceNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RequestService {

	private RequestRepository requestRepository;

	@Autowired
	public RequestService(RequestRepository requestRepository) {
		this.requestRepository = requestRepository;
	}

	@Transactional(readOnly = true)
	public Iterable<Request> findAll() throws DataAccessException {
		return requestRepository.findAll();
	}

	@Transactional(readOnly = true)
	public Iterable<Request> findRequestsByClinicOwner(int clinicOwnerId) throws DataAccessException {
		return requestRepository.findRequestsByClinicOwner(clinicOwnerId);
	}

	@Transactional(readOnly = true)
	public Request findRequestById(int id) throws DataAccessException {
		return this.requestRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Request", "ID", id));
	}

	@Transactional
	public Request saveRequest(Request request) throws DataAccessException {
		requestRepository.save(request);
		return request;
	}

	@Transactional
	public Request updateRequest(Request request, int id) throws DataAccessException {
		Request toUpdate = findRequestById(id);
		BeanUtils.copyProperties(request, toUpdate, "id", "creationDate", "clinicOwner");
		return saveRequest(toUpdate);
	}

	@Transactional
	public void deleteRequest(int id) throws DataAccessException {
		Request toDelete = findRequestById(id);
		this.requestRepository.delete(toDelete);
	}

    public List<RequestType> findAllRequestTypes() {
		return List.of(RequestType.values());
    }

	public List<RequestStatus> findAllRequestStatus() {
		return List.of(RequestStatus.values());
    }


}