import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ConnectErrorComponent } from '../../shared/errors/connect-error/connect-error.component';
import { MainService } from '../../shared/services/main.service';
import { ConfirmComponent } from './confirm/confirm.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private ref = this.firestore.collection('interviews');
  private refresh$ = new Subject();

  public data = [];

  constructor(
    private firestore: AngularFirestore,
    private mainService: MainService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.mainService.clearAll();

    this.refresh$.pipe(
      startWith(true),
      switchMap(() => {
        return this.ref.get();
      })
    ).subscribe(res => {
      const data: any = res.docs.map(doc => doc.data());
      const sorted = data.sort((a, b) => {
        const maxA = Math.max(...a.votes.map(vote => new Date(vote.time).getTime()));
        const maxB = Math.max(...b.votes.map(vote => new Date(vote.time).getTime()));
        return maxB - maxA;
      });

      console.log(sorted);


      this.data = sorted;
    });


  }


  public open(id): void {
    this.mainService.findById(id.trim(), this.showError.bind(this));
  }

  public remove(id): void {
    const dialogRef = this.matDialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (!confirm) {
        return;
      }
      this.mainService.remove(id.trim()).then((res) => {
        this.refresh$.next();
      }).catch(err => {
        console.error(err);
      });
    });
  }

  showError() {
    this.snackBar.openFromComponent(ConnectErrorComponent, {
      duration: 5000,
    });
  }

}
