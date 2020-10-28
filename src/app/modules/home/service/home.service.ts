import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {FormDataUtils} from '../utils/form-data-util';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }
  isActionDone: boolean;
  private isActionDoneSource = new BehaviorSubject(this.isActionDone);
  isActionDoneResponse = this.isActionDoneSource.asObservable();
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
    const formData = FormDataUtils.createFormData(body);
    return this.http.post(this.devzaUrl + '/create',formData, {headers: this.header});
  }

  updateTask(body): Observable<any> {
    const formData = FormDataUtils.createFormData(body);
    return this.http.post(this.devzaUrl + '/update',formData, {headers: this.header});
  }

  deleteTask(id): Observable<any> {
    const body = {
      taskid: id
    };
    const formData = FormDataUtils.createFormData(body);
    return this.http.post(this.devzaUrl + '/delete', formData, {headers: this.header});
  }

  setActionDone(value) {
    this.isActionDoneSource.next(value);
  }




}
