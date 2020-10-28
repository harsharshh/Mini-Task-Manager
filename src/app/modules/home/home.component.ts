import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from './service/home.service';
import {NbDialogService} from '@nebular/theme';
import {AddTaskComponent} from './sub-component/add-task/add-task.component';
import {Subscription} from 'rxjs/Rx';
import {AlertService} from './service/alert.service';
import {priority_enum} from './entity/priority-string';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private homeService: HomeService,
              private nbDialogService: NbDialogService,
              private alertService: AlertService) {
  }

  tasks: any = [];
  users: any;
  subscription: Subscription;
  priority = priority_enum;

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();

  }

  /*
    assigned_name: "Arpit"
    assigned_to: "1"
    created_on: "2020-10-28 12:04:13"
    due_date: null
    id: "796"
    message: "test data"*/

  ngAfterViewInit() {
    this.subscription = this.homeService.isActionDoneResponse.subscribe(res => {
      if (res == true) {
        this.getTasks();
      }
    })
  }

  getTasks() {
    this.homeService.getTasks().subscribe(res => {
      this.tasks = res.tasks;
    })
  }


  getUsers() {
    this.homeService.getUsers().subscribe(res => {
      this.users = res.users;
    })
  }

  deleteTask(id?) {
    this.homeService.deleteTask(id).subscribe(res => {
      if (res.status == 'success') {
        this.alertService.showSuccessAlert('task has been deleted');
      } else {
        this.alertService.showErrorAlert(res.error);
      }

      this.homeService.setActionDone(true);
    }, () => {
      this.alertService.showErrorAlert('error occured');
    });
  }

  addTasks() {
    const modalRef = this.nbDialogService.open(AddTaskComponent);
    modalRef.componentRef.instance.users = this.users;
    modalRef.componentRef.instance.data = null;
  }

  updateTask(row?) {
    const modalRef = this.nbDialogService.open(AddTaskComponent);
    modalRef.componentRef.instance.data = row;
    modalRef.componentRef.instance.users = this.users;
  }

  assign(event, task) {
    task['assigned_to'] = event;
    task['taskid'] = task.id;
    this.homeService.updateTask(task).subscribe(res => {
      if (res.status == 'success') {
        this.homeService.setActionDone(true);
        this.alertService.showSuccessAlert('task Reassigned');
      } else {
        this.alertService.showErrorAlert(res.error);
      }

    }, () => {
      this.alertService.showErrorAlert('error');
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
