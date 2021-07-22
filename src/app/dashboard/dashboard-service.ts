
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private httpClient: HttpClient) {
    }
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        })
      };
   

    ReadData(url: string, recordid?: any): Observable<any> {
        if (recordid) {
            const reqobj = {
                params: recordid,
            };
            return this.httpClient.get(url, reqobj);
        }
        return this.httpClient.get(url);
    }
    SaveData(url: string, reqObject: any): Observable<any> {
        return this.httpClient.post(url, reqObject, this.httpOptions);
    }
}
