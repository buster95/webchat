import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newroom',
  templateUrl: './newroom.component.html',
  styleUrls: ['./newroom.component.scss']
})
export class NewroomComponent implements OnInit {
  roomid: string = '';

  constructor(public router: Router) { }

  ngOnInit() {
  }

  onCreate() {
    if (this.roomid != null) {
      this.router.navigate([`room/${this.roomid}`]);
    }
  }

}
