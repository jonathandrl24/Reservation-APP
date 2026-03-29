import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OFFERED_SERVICES } from '../../data/offered-services';
import { ReservaCreate } from '../../model/reservation.model';
import { ReservationService } from '../../services/reservation.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly reservationService = inject(ReservationService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  protected readonly offeredServices = OFFERED_SERVICES;
  protected readonly submitting = signal(false);
  protected readonly formSubmitted = signal(false);

  protected readonly form = this.fb.group({
    nombreCliente: ['', [Validators.required, Validators.maxLength(100)]],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    servicio: ['', Validators.required],
  });

  protected showError(controlName: 'nombreCliente' | 'fecha' | 'hora' | 'servicio'): boolean {
    const c = this.form.controls[controlName];
    return c.invalid && (c.touched || this.formSubmitted());
  }

  protected errorId(controlName: string): string {
    return `err-${controlName}`;
  }

  protected onSubmit(): void {
    this.formSubmitted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid || this.submitting()) {
      return;
    }

    const v = this.form.getRawValue();
    const payload: ReservaCreate = {
      customerName: v.nombreCliente.trim(),
      date: v.fecha,
      time: normalizeTimeForApi(v.hora),
      service: v.servicio,
    };

    this.submitting.set(true);
    this.reservationService.create(payload).subscribe({
      next: () => {
        this.submitting.set(false);
        void this.router.navigateByUrl('/');
      },
      error: (err: unknown) => {
        this.submitting.set(false);
        this.toastService.showError(extractApiErrorMessage(err));
      },
    });
  }
}

function normalizeTimeForApi(timeValue: string): string {
  if (timeValue.length === 5) {
    return `${timeValue}:00`;
  }
  return timeValue;
}

function extractApiErrorMessage(err: unknown): string {
  if (err instanceof HttpErrorResponse) {
    const body = err.error;
    if (body && typeof body === 'object' && 'message' in body) {
      const m = (body as { message: unknown }).message;
      if (typeof m === 'string' && m.length > 0) {
        return m;
      }
    }
    if (typeof body === 'string' && body.length > 0) {
      return body;
    }
    if (err.status === 0) {
      return 'No hay conexión con el servidor. Comprueba que el API esté en marcha.';
    }
  }
  return 'No se pudo guardar la reserva.';
}
