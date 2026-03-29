package com.DevSenior.JonathanR.DL.Reservation_Backend.service;

import com.DevSenior.JonathanR.DL.Reservation_Backend.exception.ReservationBusinessException;
import com.DevSenior.JonathanR.DL.Reservation_Backend.model.entity.Reservation;
import com.DevSenior.JonathanR.DL.Reservation_Backend.model.entity.ReservationStatus;
import com.DevSenior.JonathanR.DL.Reservation_Backend.repository.ReservationRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @Transactional(readOnly = true)
    public List<Reservation> findAllReservations() {
        return reservationRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Reservation getReservationById(Long id) {
        return reservationRepository
                .findById(id)
                .orElseThrow(() -> new ReservationBusinessException(
                        "Reservation not found for id: " + id, HttpStatus.NOT_FOUND));
    }

    @Transactional
    public Reservation createReservation(Reservation reservation) {
        reservation.setId(null);
        if (reservationRepository.existsByDateAndTimeAndStatus(
                reservation.getDate(), reservation.getTime(), ReservationStatus.ACTIVE)) {
            throw new ReservationBusinessException(
                    "Another active reservation already exists for this date and time.",
                    HttpStatus.CONFLICT);
        }
        reservation.setStatus(ReservationStatus.ACTIVE);
        return reservationRepository.save(reservation);
    }

    @Transactional
    public void cancelReservation(Long id) {
        Reservation reservation = reservationRepository
                .findById(id)
                .orElseThrow(() -> new ReservationBusinessException(
                        "Reservation not found for id: " + id, HttpStatus.NOT_FOUND));
        if (reservation.getStatus() == ReservationStatus.CANCELED) {
            throw new ReservationBusinessException("Reservation is already canceled.", HttpStatus.CONFLICT);
        }
        reservation.setStatus(ReservationStatus.CANCELED);
        reservationRepository.save(reservation);
    }

}
