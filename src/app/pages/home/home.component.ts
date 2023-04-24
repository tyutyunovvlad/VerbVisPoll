import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from 'src/app/shared/services/main.service';
import { ConnectDialogComponent } from './components/connect-dialog/connect-dialog.component';
import { CreateDialogComponent } from './components/create-dialog/create-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  disabled = true;
  private subs = [];

  constructor(public dialog: MatDialog, private mainService: MainService) {
    this.subs.push(this.mainService.admin$.subscribe(admin => {
      this.disabled = !admin;
    })) ;
  }
  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.mainService.clearAll();
  }

  public create(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent);
  }

  public connect(): void {
    const dialogRef = this.dialog.open(ConnectDialogComponent);
  }
}
