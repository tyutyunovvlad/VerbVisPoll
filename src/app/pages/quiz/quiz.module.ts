import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NewExpertComponent } from './components/new-expert/new-expert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VotingPageComponent } from './components/voting-page/voting-page.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'voting',
    component: VotingPageComponent
  }
];

@NgModule({
  declarations: [QuizComponent, MainComponent, NewExpertComponent, VotingPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonToggleModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [RouterModule]
})
export class QuizModule { }
