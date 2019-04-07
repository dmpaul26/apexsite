import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Player } from './player.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface PlayerData {
  playername: string;
  gamesplayed: number;
  wins: number;
  averagedamage: number;
}

interface PlayerListResponse {
  playerList: Player[];
}

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css']
})
export class PlayerlistComponent implements OnInit {
  displayedColumns: string[] = ['playername', 'gamesplayed', 'wins', 'averagedamage'];
  dataSource: MatTableDataSource<PlayerData> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
    this.loadData();
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.http.get<PlayerListResponse>(environment.API_URL + '/api/getPlayerList'
    ).subscribe((data: PlayerListResponse) => {
        console.log(data);
        this.setDataSource(data);
    },
    error => console.log(error));
  }

  setDataSource(players) {
    this.dataSource = new MatTableDataSource(players);
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
  /** Builds and returns a new User. */
  /* function createNewUser(id: number): UserData {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  } */
