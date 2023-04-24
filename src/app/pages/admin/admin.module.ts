import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [AdminComponent, ConfirmComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminComponent
      }
    ]),
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class AdminModule { }
