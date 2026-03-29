package com.DevSenior.JonathanR.DL.Reservation_Backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.DevSenior.JonathanR.DL.Reservation_Backend.model.entity.Reservation;
import com.DevSenior.JonathanR.DL.Reservation_Backend.model.entity.ReservationStatus;
import java.time.LocalDate;
import java.time.LocalTime;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    boolean existsByDateAndTimeAndStatus(LocalDate date, LocalTime time, ReservationStatus status);

}
