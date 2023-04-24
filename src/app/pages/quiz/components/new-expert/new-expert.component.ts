import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  selector: 'app-new-expert',
  templateUrl: './new-expert.component.html',
  styleUrls: ['./new-expert.component.scss']
})
export class NewExpertComponent implements OnInit {

  public name: string;

  constructor(private dialog: MatDialog, private mainService: MainService) { }

  ngOnInit(): void {
  }

  public submit(): void {
    this.dialog.closeAll();
    this.mainService.startVoting(this.name);
  }

}
