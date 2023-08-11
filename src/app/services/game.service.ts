import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {HttpClient,HttpParams,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Game } from '../models/game';



@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }

  getGames(limit:number,offset:number): Observable<Game[]>{
    const params = new HttpParams()
      .set('limit',limit)
      .set('offset',offset);

    const headers = new HttpHeaders()
      .set('content-type','application/json')
      .set('Access-Control-Allow-Origin','*')

    return this.httpClient.get<Game[]>(environment.backend_api_url, {params:params, headers: headers});
  }
}
