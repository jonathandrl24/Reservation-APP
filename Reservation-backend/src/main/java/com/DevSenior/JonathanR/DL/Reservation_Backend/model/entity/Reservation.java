package com.DevSenior.JonathanR.DL.Reservation_Backend.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@Schema(description = "Reservation")
public class Reservation {
    /*
    * id: Long
    * nombre: String
    * email: String
    * phone: String
    * date: LocalDate
    * time: LocalTime
    * guests: int
    * notes: String
    */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, example = "1")
    private Long id;

    @Column(name = "customer_name", length = 100, nullable = false)
    @Schema(example = "Jane Doe", requiredMode = Schema.RequiredMode.REQUIRED)
    private String customerName;

    @Column(name = "date", nullable = false)
    @Schema(example = "2026-03-22", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;

    @Column(name = "time", nullable = false)
    @Schema(example = "14:30:00", requiredMode = Schema.RequiredMode.REQUIRED)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm:ss")
    private LocalTime time;

    @Column(name = "service", length = 100, nullable = false)
    @Schema(example = "Haircut", requiredMode = Schema.RequiredMode.REQUIRED)
    private String service;

    /**
     * Persisted as small integer (ordinal): ACTIVE=0, CANCELED=1.
     * Matches typical PostgreSQL columns created before {@code EnumType.STRING} was used; STRING + varchar would be
     * preferable for new schemas only.
     */
    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.ORDINAL)
    @Schema(accessMode = Schema.AccessMode.READ_ONLY, example = "ACTIVE")
    private ReservationStatus status;

}
