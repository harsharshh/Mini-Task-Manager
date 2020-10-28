import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from './service/home.service';
import {NbDialogService} from '@nebular/theme';
import {AddTaskComponent} from './sub-component/add-task/add-task.component';
import {Subscription} from 'rxjs/Rx';
import {AlertService} from './service/alert.service';
import {priority_enum} from './entity/priority-string';
import {priority} from './entity/priority';

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
  filteredTasks = [];
  users: any;
  subscription: Subscription;
  priority = priority_enum;
  priorityFilter = priority;
  filterValue= {};

  ngOnInit(): void {
    this.getTasks();
    this.getUsers();

  }

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
      this.filteredTasks = this.tasks;
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

  filter(type, event) {
    if(type == 'priority') {
       this.filterValue['priority'] = event;
       this.tasks = this.filteredTasks.filter(res=> {
         return res.priority == event;
       })
    } else if(type == 'due_date'){
      this.filterValue['due_date'] = event;
      this.tasks = this.filteredTasks.filter(res=> {
        res.due_date = new Date(res.due_date);
        return res.due_date.getTime() == event.getTime();
      })
    }
    else if( type== 'search'){
      if(event.target.value) {
        this.tasks = this.filteredTasks.filter(res=> {
          return res.message.includes(event.target.value);
        })
      } else {
        this.getTasks();
      }
    }
  }

  clearFilter() {
    this.filterValue = {};
    this.getTasks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
