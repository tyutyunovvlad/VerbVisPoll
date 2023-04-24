import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from './error.service';
import { TranslateService } from '@ngx-translate/core';

export interface IData {
  name: string;
  id: string;
  count: number;
  type: number;
  alternatives: Array<string>;
  votes?: Array<IVote>;
  customMetric?: any;
}

export interface IVote {
  name: string;
  votes: Array<string | number>;
  time?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private adminSubj = new BehaviorSubject(false);
  public admin$ = this.adminSubj.asObservable();

  private loadingSubj = new BehaviorSubject(false);
  public loading$ = this.loadingSubj.asObservable();

  public defaultMetrics = [
    {
      type: 'centered',
      values: ['Категорично проти', 'Проти', 'Байдуже (Утримався)', 'За', 'Категорично за'],
    },
    {
      type: 'ladder',
      values: ['1', '2', '3', '4', '5']
    }
  ];

  public deletedMetrics = [
    {
      type: 'centered',
      values: ['Дуже погано', 'Погано', 'Байдуже (Не знаю)', 'Добре', 'Дуже добре'],
    }
  ];

  public metrics = [];

  private votesSubj = new BehaviorSubject<Array<IVote>>([]);
  public votes$ = this.votesSubj.asObservable().pipe(filter(r => !!r));

  private optionsSubj = new BehaviorSubject<IData | 'empty'>(undefined);
  public options$ = this.optionsSubj.asObservable().pipe(filter(r => !!r));

  public votingName = '';

  private ref = this.firestore.collection('interviews');

  constructor(
    private router: Router,
    private firestore: AngularFirestore,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {

    this.metrics = [...this.defaultMetrics, ...this.deletedMetrics];

    this.votes$.pipe(take(1)).subscribe(res => {
      if (res.length && this.optionsSubj.value !== 'empty' && this.optionsSubj.value?.id) {

        this.ref.doc(this.optionsSubj.value?.id).update({ votes: res });
      }
    });
  }

  public translateAlternatives(): void {

    this.metrics[0].values = this.translate.instant('alts')[0];
    this.metrics[1].values = this.translate.instant('alts')[1];
    // this.metrics[2].values = this.translate.instant('alts')[2];
  }

  public create(data: IData): void {
    this.router.navigate(['/quiz']);
    this.optionsSubj.next(data);
    this.ref.doc(data.id).set(data);

    localStorage.setItem('id', data.id);
    this.findById(data.id);
  }

  public addVote(vote: IVote): void {
    this.router.navigate(['/quiz']);

    this.ref.get().pipe(take(1)).subscribe(res => {
      const data: any = res.docs.map(doc => doc.data());
      const coll = data.find(el => el.id === (this.optionsSubj.value as any).id);

      const votes = coll.votes;
      let i = 0;
      votes.forEach(el => {


        if (el.name === `${vote.name}${i ? ' (' + i + ')' : ''}`) {
          i++;
        }
      });
      if (i > 0) {
        vote.name += ' (' + i + ')';
      }

      votes.push(vote);
      this.votesSubj.next(votes);
      if (this.optionsSubj.value !== 'empty') {

        this.ref.doc(this.optionsSubj.value.id).update({
          votes
        });
      }
    });


  }

  public startVoting(name: string): void {
    this.votingName = name.trim();
    this.router.navigate(['/quiz/voting']);
  }

  public findById(id: string, callback?): void {
    this.loadingSubj.next(true);

    this.ref.get().pipe(take(1)).subscribe(res => {

      const data: any = res.docs.map(doc => doc.data());
      const coll = data.find(el => el.id === id);

      this.loadingSubj.next(false);
      if (coll) {
        this.votesSubj.next(coll.votes);
        this.optionsSubj.next(coll);
        this.router.navigate(['quiz']);
        localStorage.setItem('id', id);
        this.dialog.closeAll();

      } else if (callback) {

        this.optionsSubj.next('empty');
        callback();
      }
    });
  }

  public remove(id: string): Promise<any> {
    this.loadingSubj.next(true);
    return this.ref.doc(id).delete().finally(() => {
      this.loadingSubj.next(false);
    });
  }

  public checkIfExist(id: string): Observable<boolean> {
    return this.ref.get().pipe(map(res => {
      const data: any = res.docs.map(doc => doc.data());
      const coll = data.find(el => el.id === id);
      if (coll) {
        return true;
      }
      return false;
    }));
  }


  public clearAll(): void {
    this.votesSubj.next([]);
    this.optionsSubj.next(null);
    localStorage.removeItem('id');
  }

  public secret(): void {
    this.adminSubj.next(true);
  }

  public setCustomMetric(customMetric): void {
    this.metrics[100] = {
      type: customMetric.type,
      values: customMetric.value
    };
  }
}
