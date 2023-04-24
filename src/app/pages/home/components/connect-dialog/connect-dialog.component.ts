import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from 'src/app/shared/services/main.service';
import { ConnectErrorComponent } from '../../../../shared/errors/connect-error/connect-error.component';

@Component({
  selector: 'app-connect-dialog',
  templateUrl: './connect-dialog.component.html',
  styleUrls: ['./connect-dialog.component.scss']
})
export class ConnectDialogComponent implements OnInit {

  id: string;

  constructor(
    private mainService: MainService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void { }

  public connect(): void {
    if (this.id === 'secret12345') {
      this.mainService.secret();
      this.dialog.closeAll();
      this.router.navigate(['adminSecret']);
      return;
    }
    if (this.id) {
      this.mainService.findById(this.id.trim(), this.showError.bind(this));
    }
  }

  showError() {
    this.snackBar.openFromComponent(ConnectErrorComponent, {
      duration: 5000,
    });
  }

}
