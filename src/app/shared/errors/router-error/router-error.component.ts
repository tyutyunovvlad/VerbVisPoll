import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connect-error',
  templateUrl: './router-error.component.html',
  styles: [`
    span {
      color: #fff;
    }
  `],
})
export class RouterErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
