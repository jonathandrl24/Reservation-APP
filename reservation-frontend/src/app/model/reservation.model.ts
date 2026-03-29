/** Matches backend `ReservationStatus` (Jackson serializes enum names). */
export enum ReservationStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
}

/** Matches backend JSON (camelCase). */
export interface Reservation {
  id: number;
  customerName: string;
  date: string;
  time: string;
  service: string;
  status: ReservationStatus;
}

/** Payload for POST `/reservas`; server assigns `id` and `status`. */
export type ReservaCreate = Omit<Reservation, 'id' | 'status'>;
