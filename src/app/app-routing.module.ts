import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './pages/admin/admin.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'quiz', loadChildren: () => import('./pages/quiz/quiz.module').then(m => m.QuizModule) },
  { path: 'adminSecret', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
