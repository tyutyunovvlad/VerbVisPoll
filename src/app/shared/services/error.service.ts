import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectErrorComponent } from 'src/app/shared/errors/connect-error/connect-error.component';
import { CreateErrorComponent } from 'src/app/shared/errors/create-error/create-error.component';
import { RouterErrorComponent } from 'src/app/shared/errors/router-error/router-error.component';
import { AlternativesComponent } from '../errors/alternatives/alternatives.component';
import { CopiedComponent } from '../errors/copied/copied.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  public showRouteError() {
    this.snackBar.openFromComponent(RouterErrorComponent, {
      duration: 2500,
    });
  }

  public showConnectError() {
    this.snackBar.openFromComponent(ConnectErrorComponent, {
      duration: 2500,
    });
  }

  public showCreateError() {
    this.snackBar.openFromComponent(CreateErrorComponent, {
      duration: 2500,
    });
  }

  public showCopied() {
    this.snackBar.openFromComponent(CopiedComponent, {
      duration: 2500,
    });
  }

  public showAltErrors() {
    this.snackBar.openFromComponent(AlternativesComponent, {
      duration: 2500,
    });
  }
}
