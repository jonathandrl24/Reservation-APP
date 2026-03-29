import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reservation, ReservationStatus } from '../../model/reservation.model';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationListComponent {
  private readonly reservationService = inject(ReservationService);

  protected readonly ReservationStatus = ReservationStatus;

  protected readonly reservations = signal<Reservation[]>([]);
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly cancelingId = signal<number | null>(null);

  constructor() {
    this.loadReservations();
  }

  protected loadReservations(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.reservationService.getAll().subscribe({
      next: (rows) => {
        this.reservations.set(rows);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar las reservas. Comprueba la conexión con el servidor.');
        this.loading.set(false);
      },
    });
  }

  protected cancelReservation(reservation: Reservation): void {
    if (reservation.status === ReservationStatus.CANCELED) {
      return;
    }
    this.cancelingId.set(reservation.id);
    this.errorMessage.set(null);
    this.reservationService.cancel(reservation.id).subscribe({
      next: () => {
        this.cancelingId.set(null);
        this.loadReservations();
      },
      error: () => {
        this.cancelingId.set(null);
        this.errorMessage.set('No se pudo cancelar la reserva.');
      },
    });
  }
}
