import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';
import { IVote, MainService } from 'src/app/shared/services/main.service';
import { NewExpertComponent } from '../new-expert/new-expert.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public name: string;
  public votes: Array<IVote>;
  public alternatives: Array<string>;
  public markType: string;
  public code: string;
  public extended = false;
  public extended2 = false;

  public times = [];
  private subs = [];

  public bars = [];
  public math: Math = Math;

  public mainResults = [

  ];

  public res2MoreStates = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  public metricData;

  constructor(
    private dialog: MatDialog,
    private mainService: MainService,
    private errorService: ErrorService,
    private router: Router,
  ) {

    let id = localStorage.getItem('id');

    if (!id) {
      this.errorService.showRouteError();
      this.router.navigate(['home']);
    }

    this.subs.push(this.mainService.options$.subscribe(res => {

      if (res === 'empty') {
        this.errorService.showRouteError();
        this.router.navigate(['home']);
        return;
      }

      console.log(res);
      if (res.type === 100) {
        this.mainService.setCustomMetric(res.customMetric);
      }
      

      this.name = res.name;
      this.alternatives = res.alternatives;
      this.markType = this.mainService.metrics[res.type].type;
      this.metricData = this.mainService.metrics[res.type];
      this.code = res.id;

      this.subs.push(this.mainService.votes$.subscribe(res => {

        this.bars = [];

        this.votes = res;
        this.times[0] = res[0]?.time;
        this.times[1] = res[res.length - 1]?.time;
        this.alternatives.forEach((alt, i) => {
          this.bars.push({ i, marks: [] });

          this.votes.forEach((vote, j) => {
            this.bars[i].marks.push(vote.votes[i]);
          });
          this.bars[i].marks.sort();


        });
        this.generateMain();
      }));
    }));

  }

  ngOnInit(): void {

    // setTimeout(() => {
    //   if (!this.name) {
    //     this.errorService.showRouteError();
    //     this.router.navigate(['home']);
    //   }
    // }, 300);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  public newExpert(): void {
    this.dialog.open(NewExpertComponent, { scrollStrategy: new NoopScrollStrategy() });
  }

  public getNumberOfMarks(marks, i) {
    return marks.filter(mark => mark === i).length;
  }

  public copy(text) {
    navigator.clipboard.writeText(text);

    this.errorService.showCopied();
  }

  public extend() {
    this.extended = !this.extended;
  }

  public extend2() {
    this.extended2 = !this.extended2;
  }

  public generateMain() {

    let arr = [];
    let max = -100000;
    let min = 100000;

    this.bars.forEach((v, i) => {
      if (this.bars[i]) {

        let mark = (this.getNumberOfMarks(this.bars[i].marks, 0) * (this.markType === 'centered' ? -2 : -2)) +
          (this.getNumberOfMarks(this.bars[i].marks, 1) * (this.markType === 'centered' ? -1 : -1)) +
          (this.getNumberOfMarks(this.bars[i].marks, 2) * (this.markType === 'centered' ? 0 : 0)) +
          (this.getNumberOfMarks(this.bars[i].marks, 3) * (this.markType === 'centered' ? 1 : 1)) +
          (this.getNumberOfMarks(this.bars[i].marks, 4) * (this.markType === 'centered' ? 2 : 2));

        if (mark > max) {
          max = mark;
        }
        if (mark < min) {
          min = mark;
        }
        arr.push({ mark });
      }
    });

    if (this.markType === "centered") {

      arr.forEach((v, i) => {
        if (arr[i].mark > 0) {
          arr[i].per = Math.abs(v.mark * 100 / Math.max(Math.abs(max), Math.abs(min)));
        } else if (arr[i].mark < 0) {
          arr[i].per = Math.abs(v.mark * 100 / Math.max(Math.abs(max), Math.abs(min)));
        }

        if (arr[i].mark === 0) {
          arr[i].color = 2;
        } else if (arr[i].mark === max) {
          arr[i].color = 4;
        } else if (arr[i].mark === min) {
          arr[i].color = 1;
        } else if (arr[i].mark > 0) {
          arr[i].color = 3;
        } else if (arr[i].mark < 0) {
          arr[i].color = 1;
        }
      });

    } else if (this.markType === 'ladder') {
      // arr.forEach((v, i) => {
      //   arr[i].per = v.mark * 100 / max;
      //   console.log(min);

      //   let center = Math.round(min + (max - min) / 2);
      //   if (arr[i].mark === min) {
      //     arr[i].color = 2;
      //   } else if (arr[i].mark === max) {
      //     arr[i].color = 4;
      //   } else if (arr[i].mark === center) {
      //     arr[i].color = 2;
      //   } else if (arr[i].mark > center) {
      //     arr[i].color = 2;
      //   } else if (arr[i].mark < center) {
      //     arr[i].color = 2;
      //   }
      // });

      arr.forEach((v, i) => {
        if (arr[i].mark > 0) {
          console.log(1);

          arr[i].per = Math.abs(v.mark * 100 / Math.max(Math.abs(max), Math.abs(min)));
        } else if (arr[i].mark < 0) {
          console.log(v.mark, Math.max(max, min));
          arr[i].per = Math.abs(v.mark * 100 / Math.max(Math.abs(max), Math.abs(min)));
        }

        if (arr[i].mark === 0) {
          arr[i].color = 2;
        } else if (arr[i].mark === max) {
          arr[i].color = 4;
        } else if (arr[i].mark === min) {
          arr[i].color = 2;
        } else if (arr[i].mark > 0) {
          arr[i].color = 2;
        } else if (arr[i].mark < 0) {
          arr[i].color = 2;
        }
      });
    }


    this.mainResults = arr;
  }

  public toTop() {

    document.body.scroll(0, 0);
  }

  public calcZZ(marks) {
    return Math.round(((this.getNumberOfMarks(marks, 3) + this.getNumberOfMarks(marks, 4)) / marks.length) * 100);
  }
  public calcZNZ(marks) {
    return Math.round(((this.getNumberOfMarks(marks, 0) + this.getNumberOfMarks(marks, 1)) /
      marks.length) * 100);
  }

  public calcIN(marks) {
    return Math.round(((this.getNumberOfMarks(marks, 2)) / marks.length) * 100);
  }

  public calcPD(marks) {
    return Math.round(((2 *
      this.math.min(
        (
          (this.getNumberOfMarks(marks, 0)) +
          (this.getNumberOfMarks(marks, 1))
        ),
        (
          (this.getNumberOfMarks(marks, 3)) +
          (this.getNumberOfMarks(marks, 4))
        )
      )
    ) / marks.length) * 100);
  }

  public calcCON(marks) {
    return Math.round(((2 *
      this.math.min(
        (this.getNumberOfMarks(marks, 0)),
        (this.getNumberOfMarks(marks, 4))

      )
    ) / marks.length) * 100);
  }

  public calcLO(marks) {
    return Math.round(((this.getNumberOfMarks(marks, 4)) / marks.length) * 100);
  }
  public calcALO(marks) {
    return Math.round(((this.getNumberOfMarks(marks, 0)) / marks.length) * 100);
  }
  public calcPO(marks) {
    return Math.round(((this.getNumberOfMarks(marks, 1) + this.getNumberOfMarks(marks, 2) + this.getNumberOfMarks(marks, 3)) / marks.length) * 100);
  }

  public calcOS(marks) {
    if (this.markType === 'ladder') {
      return Math.round(((Math.max(this.getNumberOfMarks(marks, 0), this.getNumberOfMarks(marks, 1), this.getNumberOfMarks(marks, 2), this.getNumberOfMarks(marks, 3), this.getNumberOfMarks(marks, 4))) / marks.length) * 100);
    } else if (this.markType === 'centered') {
      return Math.round(((Math.abs(this.getNumberOfMarks(marks, 0) + this.getNumberOfMarks(marks, 1) - this.getNumberOfMarks(marks, 3) - this.getNumberOfMarks(marks, 4))) / marks.length) * 100);
    }
    return 0;
  }

}
