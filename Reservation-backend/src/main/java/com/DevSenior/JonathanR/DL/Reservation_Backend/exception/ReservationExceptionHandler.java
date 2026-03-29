package com.DevSenior.JonathanR.DL.Reservation_Backend.exception;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ReservationExceptionHandler {

    @ExceptionHandler(ReservationBusinessException.class)
    public ResponseEntity<Map<String, String>> handleReservationBusiness(ReservationBusinessException ex) {
        return ResponseEntity.status(ex.getHttpStatus()).body(Map.of("message", ex.getMessage()));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleNotReadable(HttpMessageNotReadableException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "message",
                        "Invalid JSON body. Use date as yyyy-MM-dd, time as HH:mm:ss (e.g. 14:30:00). "
                                + "Replace Swagger placeholder values such as \"string\" with real values."));
    }

}
