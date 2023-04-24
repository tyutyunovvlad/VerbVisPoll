import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copied',
  templateUrl: './copied.component.html',
  styles: [`
    span {
      color: #fff;
    }
  `],
})
export class CopiedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
