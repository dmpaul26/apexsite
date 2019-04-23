import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Team } from './team.model';
import { environment } from 'src/environments/environment';

export interface TeamData {
  playername: string;
  gamesplayed: number;
  wins: number;
  averagedamage: number;
  kills: number;
  damageperkill: number;
  killspergame: number;
}

export interface TeamListRequest {
  all: boolean;
  date: Date;
}

interface TeamListResponse {
  playerList: Team[];
}

@Component({
  selector: 'app-teamlist',
  templateUrl: './teamlist.component.html',
  styleUrls: ['./teamlist.component.css']
})
export class TeamlistComponent implements OnInit {
  displayedColumns: string[] = ['players', 'gamesplayed', 'wins', 'winpercent', 'averagedamage', 'kills', 'damageperkill', 'killspergame', 'revivespergame', 'respawnspergame'];
  dataSource: MatTableDataSource<TeamData> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private _selectedDate: Date;

  public set selectedDate(value: Date) {
    const changed = this._selectedDate !== value;
    this._selectedDate = value;
    if(changed) {
       this.loadDataByDate();
       sessionStorage['teamFilterDate'] = this._selectedDate;
    }
  }

  public get selectedDate():Date {
      return this._selectedDate;
  }

  constructor(private http: HttpClient) {
    if (sessionStorage['teamFilterDate']) {
      console.log('found session storage');
      this.selectedDate = new Date(sessionStorage['teamFilterDate']);
    } else {
      this.loadOverallData();
    }

    this.dataSource.sort = this.sort;
  }
  
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadOverallData() {
    this.http.get<TeamListResponse>(environment.API_URL + '/api/getTeamList'
    ).subscribe((data: TeamListResponse) => {
        console.log(data);
        this.setDataSource(data);
    },
    error => console.log(error));
  }

  loadDataByDate() {
    const request: TeamListRequest = <TeamListRequest>{ date: this._selectedDate }
    this.http.post<TeamListResponse>(environment.API_URL + '/api/getTeamList',
      request
    ).subscribe((data: TeamListResponse) => {
        console.log(data);
        this.setDataSource(data);
    },
    error => console.log(error));
  }

  loadDataForAllDates() {
    const request: TeamListRequest = <TeamListRequest>{ all: true }
    this.http.post<TeamListResponse>(environment.API_URL + '/api/getTeamList',
      request
    ).subscribe((data: TeamListResponse) => {
        console.log(data);
        this.setDataSource(data);
    },
    error => console.log(error));
  }

  loadToday() {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    this.selectedDate = today;
  }

  loadPreviousDay() {
    const date: Date = new Date(this.selectedDate);
    date.setDate(date.getDate() - 1);
    this.selectedDate = date;
  }

  loadNextDay() {
    const date: Date = new Date(this.selectedDate);
    date.setDate(date.getDate() + 1);
    this.selectedDate = date;
  }

  setDataSource(players) {
    this.dataSource = new MatTableDataSource(players);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSize = 25; // default page size
    this.dataSource.sort = this.sort;
  }
}
