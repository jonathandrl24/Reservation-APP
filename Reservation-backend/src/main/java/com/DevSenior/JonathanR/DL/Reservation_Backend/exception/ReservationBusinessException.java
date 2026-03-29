package com.DevSenior.JonathanR.DL.Reservation_Backend.exception;

import org.springframework.http.HttpStatus;

public class ReservationBusinessException extends RuntimeException {

    private final HttpStatus httpStatus;

    public ReservationBusinessException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

}
