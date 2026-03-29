import { Routes } from '@angular/router';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';

export const routes: Routes = [
  { path: '', component: ReservationListComponent },
  { path: 'crear', component: ReservationFormComponent },
  { path: '**', redirectTo: '' },
];
