import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ConnectErrorComponent } from './shared/errors/connect-error/connect-error.component';
import { ErrorService } from './shared/services/error.service';
import { MainService } from './shared/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tpr';
  loading$: Observable<boolean>;

  constructor(private mainService: MainService, private router: Router, private errorService: ErrorService, private snackBar: MatSnackBar) {
    this.loading$ = this.mainService.loading$;
  }

  ngOnInit(): void {
    let id = localStorage.getItem('id');
    if (id) {
      this.mainService.findById(id);
    }

    this.router.events.pipe(filter(e => e instanceof NavigationEnd), take(1))
      .subscribe((res: NavigationEnd) => {
        if (res.url.includes('?') && res.url.includes('=')) {
          let id = res.url.split('?').pop().split('=')?.pop();
          if (id) {

            this.mainService.findById(id, this.showError.bind(this));
          }
        }



      })

  }

  showError() {
    this.snackBar.openFromComponent(ConnectErrorComponent, {
      duration: 5000,
    });
  }

}
