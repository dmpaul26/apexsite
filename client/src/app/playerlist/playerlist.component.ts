import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDatepicker } from '@angular/material';
import { Player } from './player.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface PlayerData {
  playername: string;
  gamesplayed: number;
  wins: number;
  averagedamage: number;
}

export interface PlayerListRequest {
  date: Date;
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

  private _selectedDate: Date;

  public set selectedDate(value: Date) {
    const changed = this._selectedDate !== value;
    this._selectedDate = value;
    if(changed) {
       this.loadDataByDate(this._selectedDate);
    }
  }

  public get selectedDate():Date {
      return this._selectedDate;
  }

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

  loadDataByDate(date) {
    const request: PlayerListRequest = <PlayerListRequest>{ date: this._selectedDate }
    this.http.post<PlayerListResponse>(environment.API_URL + '/api/getPlayerList',
      request
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
