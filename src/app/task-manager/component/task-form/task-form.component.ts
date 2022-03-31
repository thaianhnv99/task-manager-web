import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {IPiorites, ITask, Locals} from "../../models/task-model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input('taskData') taskData?: ITask;
  @Input('piorityList') piorityList: IPiorites[] = [];
  @Output('changeTask') changeTask = new EventEmitter<ITask>();
  minDate = '';
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.minDate = this.transformDate(Date.now());
    this.buildForm();
    this.fillData();
  }

  fillData() {
    if (this.taskData) {
      this.taskForm.patchValue({
        taskTitle: this.taskData.taskTitle,
        description: this.taskData.description,
        duoDate: this.taskData.duoDate,
        piority: this.taskData.piority,
      })
    }
  }

  buildForm() {
    this.taskForm = this.fb.group({
      taskTitle: ['', Validators.required],
      description: [''],
      duoDate: [this.transformDate(Date.now())],
      piority: ['normal']
    })
  }

  actionTask() {
    if (this.taskForm.invalid) {
      return;
    }
    const taskData: ITask = {
      idTask: this.taskData?.idTask,
      taskTitle: this.taskForm.get('taskTitle')?.value,
      description: this.taskForm.get('description')?.value,
      duoDate: this.taskForm.get('duoDate')?.value,
      piority: this.taskForm.get('piority')?.value,
    }
    this.changeTask.emit(taskData);
  }

  //transform date
  transformDate(dateString: string | number | Date, format?: string, local?: Locals) {
    return formatDate(dateString, format || 'yyyy-MM-dd', local || 'en')
  }

}
