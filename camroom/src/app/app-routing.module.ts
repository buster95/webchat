import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewroomComponent } from './components/newroom/newroom.component';
import { RoomComponent } from './components/room/room.component';


const routes: Routes = [
  { path: 'create', component: NewroomComponent, },
  { path: 'room/:room', component: RoomComponent, },
  { path: '**', redirectTo: 'create' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
