import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  userId: any;
  data: any;
  value: any;
  private dataInfoSource = new BehaviorSubject(this.value);
  stateDataInfo = this.dataInfoSource.asObservable();

  constructor(private http: HttpClient) {
  }

  private baseUrl = environment.BASE_URL;
  private customerUrl = this.baseUrl + '/user-service/admin/v1.0.0/searchCustomers';
  private enrollmentUrl = this.baseUrl + '/user-service/admin/v1.0.0/searchEnrollments';
  private userProfileUrl = this.baseUrl + '/user-service/admin/v1.0.0/userProfile';
  private userDocumentsUrl = this.baseUrl + '/user-service/admin/v1.0.0/userDocuments';
  private userNomineeUrl = this.baseUrl + '/user-service/admin/v1.0.0/nomineeDetails';

  getCustomers(header: any, body?): Observable<any> {
    return this.http.post(this.customerUrl, body, {headers: header, observe: 'response'});
  }

  getEnrollments(header: any, body?): Observable<any> {
    return this.http.post(this.enrollmentUrl, body, {headers: header, observe: 'response'});
  }

  getUserProfile(header: any, body?): Observable<any> {
    return this.http.post(this.userProfileUrl, body, {headers: header, observe: 'response'});
  }

  getUserDocuments(header: any): Observable<any> {
    return this.http.get(this.userDocumentsUrl, {headers: header, observe: 'response'});
  }

  getUserNominee(header: any): Observable<any> {
    return this.http.get(this.userNomineeUrl, {headers: header, observe: 'response'});
  }

  setValue(value) {
    this.dataInfoSource.next(value);
  }

  setData(value) {
    this.data = value;
  }

  getData() {
    return this.data;
  }
}
