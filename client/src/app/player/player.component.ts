import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Game } from './game.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { environment } from 'src/environments/environment';

export interface GameData {
  timestamp: Date;
  win: boolean;
  kills: number;
  damage: number;
  revives: number;
  respawns: number;
}

interface GameLogResponse {
  playerList: Game[];
}

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  displayedColumns: string[] = ['timestamp', 'win', 'kills', 'damage', 'revives', 'respawns'];
  dataSource: MatTableDataSource<GameData> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  playerName: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: HttpClient) {

    this.playerName = this.activatedRoute.snapshot.params.playerName;
    this.loadPlayerGames();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPlayerGames() {
    this.http.get<GameLogResponse>(environment.API_URL + '/api/getGameLog/' + this.playerName
    ).subscribe((data: GameLogResponse) => {
        console.log(data);
        this.setDataSource(data);
    },
    error => console.log(error));
  }

  setDataSource(games) {
    this.dataSource = new MatTableDataSource(games);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
