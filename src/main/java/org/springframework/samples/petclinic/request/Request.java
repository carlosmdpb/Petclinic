package org.springframework.samples.petclinic.request;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;
import org.springframework.samples.petclinic.clinicowner.ClinicOwner;
import org.springframework.samples.petclinic.model.BaseEntity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "requests")
public class Request extends BaseEntity {

	@NotEmpty
	@Length(min = 5, max = 50)
	private String title;

	@NotEmpty
	@Length(min = 10, max = 500)
	private String description;

	@NotNull
	private RequestType type;

	@NotNull
	private RequestStatus status;

	@CreationTimestamp
	private LocalDateTime creationDate;

	@ManyToOne
	@JoinColumn(name = "clinic_owner_id")	
	private ClinicOwner clinicOwner;



}