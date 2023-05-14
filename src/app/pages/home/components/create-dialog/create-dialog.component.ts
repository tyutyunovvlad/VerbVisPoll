import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ErrorService } from 'src/app/shared/services/error.service';
import { IData, MainService } from 'src/app/shared/services/main.service';


@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements AfterViewInit, OnDestroy {


  public selectedPage = 0;

  public form: FormGroup;
  public alternativesForm: FormGroup | undefined;
  public customMetricForm: FormGroup | undefined;
  public data: IData | undefined;

  public selectedMetric = -1;
  public metrics = [];
  private subs = [];

  public customMetricValue;

  constructor(
    private mainService: MainService,
    public dialog: MatDialog,
    private errorService: ErrorService,
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.mainService.translateAlternatives();
    this.metrics = this.mainService.defaultMetrics;

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      id: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      // count: new FormControl('2', [Validators.required, Validators.max(10), Validators.min(1)]),
    });

  }

  ngAfterViewInit(): void {
    document.querySelector('mat-button-toggle:first-child').dispatchEvent(new Event('click'));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public openMetricSelectPage(e): void {
    e.preventDefault();
    this.selectedPage = 1;
  }

  public onSubmit(e): void {
    e.preventDefault();

    if (this.form.value.name.trim().length === 0 || this.form.value.id.trim().length === 0) {
      this.form.controls.name.setValue(this.form.value.name.trim());
      this.form.controls.id.setValue(this.form.value.id.trim());
      return;
    }

    if (this.selectedMetric === 100 && this.customMetricForm?.invalid) {
      return;
    }


    this.subs.push(this.mainService.checkIfExist(this.form.value.id.trim()).subscribe(exist => {
      if (!exist) {
        this.data = {
          name: this.form.value.name.trim(),
          // count: this.form.value.count,
          id: this.form.value.id.trim(),
          type: this.selectedMetric,
          alternatives: [],
          votes: [],
          customMetric: {
            ...this.customMetricValue
          }
        };

        this.alternativesForm = new FormGroup({});
        for (let i = 0; i < 2; i++) {
          this.alternativesForm.addControl(
            `${i}`,
            new FormControl(`${this.translateService.instant('home.alt')} ${i + 1}`, [Validators.required, Validators.maxLength(50)])
          );
          this.data.alternatives.push('');
        }
      } else {
        this.errorService.showCreateError();
        this.selectedPage = 0;
      }
    }));

    this.selectedPage = 3;

  }

  public addAlternative(e): void {
    e.preventDefault();
    const values = Object.values(this.alternativesForm?.value);
    console.log(values);

    this.alternativesForm = new FormGroup({});
    this.data.alternatives.push('');

    for (let i = 0; i < this.data.alternatives.length; i++) {
      const text = values[i] || this.translateService.instant('home.alt') + ' ' + (i + 1);
      console.log(text);

      this.alternativesForm.addControl(
        `${i}`,
        new FormControl(`${text}`, [Validators.required, Validators.maxLength(50)])
      );

    }

    // this.alternativesForm?.addControl(
    //   `${this.alternativesForm?.value.length}`,
    //   new FormControl(`${this.translateService.instant('home.alt')} ${this.alternativesForm?.value.length + 1}`, [Validators.required, Validators.maxLength(50)])
    // );
    // this.data.alternatives.push('');
    // this.cdr.detectChanges();

  }

  public removeAlternative(e): void {
    e.preventDefault();
    const values = Object.values(this.alternativesForm?.value);
    console.log(values);

    this.alternativesForm = new FormGroup({});
    this.data.alternatives.pop();

    for (let i = 0; i < this.data.alternatives.length; i++) {
      const text = values[i] || this.translateService.instant('home.alt') + ' ' + (i + 1);
      console.log(text);

      this.alternativesForm.addControl(
        `${i}`,
        new FormControl(`${text}`, [Validators.required, Validators.maxLength(50)])
      );

    }

  }

  public onSubmitAlternatives(): void {
    console.log(111);

    // tslint:disable: forin
    for (const i in this.alternativesForm?.value) {
      for (const j in this.alternativesForm?.value) {
        if (this.alternativesForm?.value[i] === this.alternativesForm?.value[j] && i !== j) {
          this.errorService.showAltErrors();
          return;
        }
      }
      if (this.alternativesForm.value[i].trim().length === 0) {
        this.alternativesForm.controls[i].setValue('');
        return;
      }


      this.data.alternatives[i] = this.alternativesForm?.value[i];
    }

    this.mainService.create(this.data);
    this.dialog.closeAll();
  }


  public close() {
    this.dialog.closeAll();
  }

  public generateID(e) {
    e.preventDefault();

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.form.controls.id.setValue(result);
  }


  public kek() {
    for (const i in this.alternativesForm?.value) {
      for (const j in this.alternativesForm?.value) {
        if (this.alternativesForm?.value[i] === this.alternativesForm?.value[j] && i !== j) {
          this.alternativesForm.controls[i].setErrors({ 'incorrect': true });
          this.alternativesForm.markAllAsTouched();
          this.alternativesForm.markAsDirty();
          this.errorService.showAltErrors();

          return;
        }
      }
    }
  }

  public createCustomMetric(): void {

    this.customMetricForm = new FormGroup({
      type: new FormControl(this.customMetricValue?.type || 'centered', Validators.required),
      value: new FormArray([
        new FormControl(this.customMetricValue?.value[0] || '', [Validators.required, Validators.maxLength(20)]),
        new FormControl(this.customMetricValue?.value[1] || '', [Validators.required, Validators.maxLength(20)]),
        new FormControl(this.customMetricValue?.value[2] || '', [Validators.required, Validators.maxLength(20)]),
        new FormControl(this.customMetricValue?.value[3] || '', [Validators.required, Validators.maxLength(20)]),
        new FormControl(this.customMetricValue?.value[4] || '', [Validators.required, Validators.maxLength(20)]),
      ])
    });
    this.selectedPage = 2;
  }

  public submitCustomMetric(): void {
    if (this.customMetricForm.invalid) {
      return;
    }
    this.selectedPage = 1;
    (this.customMetricForm.controls.value as FormArray).controls.forEach(el => {
      console.log(el);
      el.setValue(el.value.trim());
    });
    this.customMetricValue = this.customMetricForm.value;
    this.selectedMetric = 100;
    this.customMetricForm = null;
  }

  public back(index): void {
    this.selectedPage = index;
  }
}
