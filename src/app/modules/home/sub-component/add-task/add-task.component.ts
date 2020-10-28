import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HomeService} from '../../service/home.service';
import {AlertService} from '../../service/alert.service';
import {priority} from '../../entity/priority';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @Input() data: any;
  @Input() users: any;
  taskForm: FormGroup;
  taskId: any;
  model: any;
  priority = priority;


  constructor(private nbDialogRef: NbDialogRef<AddTaskComponent>,
              private fb: FormBuilder,
              private homeService: HomeService,
              private alertService: AlertService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      message: ['', Validators.required],
      due_date: [''],
      priority: [null ],
      assigned_to: [''],
    });
    this.homeService.getUsers().subscribe(res => {
      this.users = res.users;
    });

    if(this.data) {
      this.taskId = this.data.id;
      this.model= this.data;
      this.taskForm.get('message').setValue(this.model.message);
      this.taskForm.get('due_date').setValue(new Date(this.model.due_date));
      this.taskForm.get('assigned_to').setValue(this.model.assigned_to);
      this.taskForm.get('priority').setValue(this.model.priority);

    }
  }

  close() {
    this.nbDialogRef.close();
  }

  submit() {

    if (this.taskForm.valid) {
      this.model = this.taskForm.value;
      if (!this.taskId) {
        this.model['due_date']= this.datePipe.transform(this.model['due_date'], 'yyyy-MM-dd HH:mm:ss');
        this.homeService.createTask(this.model).subscribe(res => {
          if (res.status == 'success') {
            this.homeService.setActionDone(true);
            this.close();
            this.alertService.showSuccessAlert('task has been created');
          } else {
            this.alertService.showErrorAlert(res.error);
          }

        }, () => {
          this.alertService.showErrorAlert('error');
        })
      } else {
        this.model['taskid'] = this.taskId;
        this.model['due_date']= this.datePipe.transform(this.model['due_date'], 'yyyy-MM-dd HH:mm:ss');
        this.homeService.updateTask(this.model).subscribe(res => {
          if (res.status == 'success') {
            this.homeService.setActionDone(true);
            this.close();
            this.alertService.showSuccessAlert('task has been updated');
          } else {
            this.alertService.showErrorAlert(res.error);
          }

        }, () => {
          this.alertService.showErrorAlert('error');
        })
      }
    }
  }

  get f() {
    return this.taskForm.controls;
  }

}
