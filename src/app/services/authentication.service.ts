import { EventEmitter, Injectable, Output } from '@angular/core';
import { throwError as observableThrowError, of, BehaviorSubject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, mapTo } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalConstants } from '../GlobalConstants';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly JWT_TOKEN = 'Token';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  public IsUserAutheticate: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  public Login(user: any): Observable<boolean> {
    return this.http.post<any>(
      GlobalConstants.API_URL.BaseUrl + GlobalConstants.API_URL.AUTH.Login,
      user
    ).pipe(
      tap((jwtToken) => {
        this.storeTokens(jwtToken);
        
      }),
      mapTo(true),
      catchError(this.errorHandler)
    );
  }
  
  public UserRegistarion(user : any): Observable<any> {
    return this.http.post<any>(
      GlobalConstants.API_URL.BaseUrl + GlobalConstants.API_URL.AUTH.Register,
      user
    )
  }

  SetUserAutheticate(data: any) {
    this.IsUserAutheticate.next(data);
  }

  public Logout() {
    this.clearSession();
    this.eventEmitterforMenu('');
  }


  public IsAuthenticated() {
    if (sessionStorage.getItem(this.JWT_TOKEN)) {
      return true;
    }
    return false;
  }


  public Gettoken() {
    return sessionStorage.getItem(this.JWT_TOKEN);
  }

  private getRefreshToken() {
    return sessionStorage.getItem(this.REFRESH_TOKEN);
  }


  private storeTokens(tokens: any) {
  
    sessionStorage.setItem(this.JWT_TOKEN, tokens.jwtToken);
    this.eventEmitterforMenu(tokens);
    // sessionStorage.setItem(this.REFRESH_TOKEN, tokens.RefreshToken);
  }

  private clearSession() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  private eventEmitterforMenu(tokens: any){
    this.getLoggedInName.emit(tokens.fullName);
  }


  private errorHandler(error: HttpErrorResponse) {
    if (error && error.error && error.error.Errors) {
      return observableThrowError(error.error.Errors);
    }
    return observableThrowError(error || 'Node server error');
  }
}
