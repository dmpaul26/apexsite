import { NgModule } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { PlayerlistComponent } from './playerlist/playerlist.component';
import { TeamlistComponent } from './teamlist/teamlist.component';
import { TeamComponent } from './team/team.component';


const routes: Routes = [
  { path: '', component: PlayerlistComponent },
  { path: 'playerlist', component: PlayerlistComponent },
  { path: 'player/:playerName', component: PlayerComponent },
  { path: 'teamlist', component: TeamlistComponent },
  { path: 'team/:players', component: TeamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
