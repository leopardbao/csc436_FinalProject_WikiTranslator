import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchHistoryComponent } from './search-history/search-history.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'history', canActivate: [AdminGuard], component: SearchHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
