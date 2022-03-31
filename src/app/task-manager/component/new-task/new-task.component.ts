import {Component, OnInit} from '@angular/core';
import {formatDate} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Locals, IPiorites, ITask} from "../../models/task-model";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  minDate = '';

  piorityList: IPiorites[] = [
    {label: 'low', value: 'low'},
    {label: 'normal', value: 'normal'},
    {label: 'high', value: 'high'},
  ]
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.minDate = this.transformDate(Date.now());
    this.buildForm();
  }

  buildForm() {
    this.taskForm = this.fb.group({
      taskTitle: ['', Validators.required],
      description: [''],
      duoDate: [this.transformDate(Date.now())],
      piority: ['normal']
    })
  }

  //transform date
  transformDate(dateString: string | number | Date, format?: string, local?: Locals) {
    return formatDate(dateString, format || 'yyyy-MM-dd', local || 'en')
  }

  /**
   * Get data and add to task list
   */
  addTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const taskData: ITask = {
      taskTitle: this.taskForm.get('taskTitle')?.value,
      description: this.taskForm.get('description')?.value,
      duoDate: this.taskForm.get('duoDate')?.value,
      piority: this.taskForm.get('piority')?.value,
    }

    this.taskService.saveTask(taskData);
    // when save date ex reset form;
    this.resetForm();
  }

  resetForm() {
    this.taskForm.reset({duoDate: this.transformDate(Date.now()), piority: 'normal'});
  }

}
