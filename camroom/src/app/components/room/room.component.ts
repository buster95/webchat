import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room: string = '';
  userCounter: number = 0;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private wsService: WebsocketService) { }

  ngOnInit() {
    this.room = this.activatedRoute.snapshot.params.room;
    this.wsService.emit('join-room', this.room);

    this.wsService.listen('message').subscribe(data => {
      console.log(data);
    });

    this.wsService.listen('quantity-clients').subscribe((data: number) => {
      this.userCounter = data;
    });
  }

  onClose() {
    this.wsService.close();
    this.router.navigate(['/create']);
  }
}