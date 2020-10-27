import { Component, OnInit } from '@angular/core';
import {HomeService} from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }
  tasks : any = [{}];
  users: any;

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();

  }

  getTasks() {
    this.homeService.getTasks().subscribe(res=> {
     //   this.tasks = res.tasks;
    })
  }


  getUsers() {
    this.homeService.getUsers().subscribe(res=> {
      this.users = res.users;
    })
  }

}
