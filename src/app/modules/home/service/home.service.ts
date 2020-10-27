import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = environment.BASE_URL;
  private devzaUrl =  this.baseUrl + '/tests/tasks';
  apiKey = 'YDYJdwCmGExZmUhjieZcQLfnyfv65j43';
  header = {
    authToken: this.apiKey
  };

  getTasks(): Observable<any> {
    return this.http.get(this.devzaUrl + '/list', {headers: this.header});
  }

  getUsers(): Observable<any> {
    return this.http.get(this.devzaUrl + '/listusers', {headers: this.header});
  }

  createTask(body): Observable<any> {
    return this.http.post(this.devzaUrl + '/create',body, {headers: this.header});
  }

  updateTask(body): Observable<any> {
    return this.http.post(this.devzaUrl + '/update',body, {headers: this.header});
  }

  deleteTask(body): Observable<any> {
    return this.http.post(this.devzaUrl + '/delete', body, {headers: this.header});
  }




}
