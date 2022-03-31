import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ITask} from "../models/task-model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private savinngData = new BehaviorSubject<ITask[]>([{
    idTask: `${Math.random()}`,
    taskTitle: "15",
    description: "234",
    duoDate: "2022-03-30",
    piority: "normal"
  }]);

  constructor() {
  }

  saveTask(value: ITask) {
    const newValue = {...value, idTask: `${Math.random()}`};
    this.savinngData.next([...this.savinngData.getValue(), newValue]);
  }

  updateTask(value: ITask) {
    const listTask = this.getTaskList();
    if (value) {
      const newValue = listTask.map(item => {
        if (item.idTask === value.idTask) {
          return {...item, ...value}
        }
        return item;
      })
      this.savinngData.next(newValue);
    }
  }

  removeTask(value: ITask) {
    const listTask = this.getTaskList();
    const index = listTask.findIndex(item => item.idTask === value.idTask);
    if (index > -1) {
      listTask.splice(index, 1);
      this.savinngData.next(listTask);
    }
  }

  removeTaskSelected(taskSelected: ITask[]) {
    const listTask = this.getTaskList();
    const newList = listTask.filter(item => {
      return !(taskSelected.findIndex(i => i.idTask === item.idTask) > -1);
    });
    this.savinngData.next(newList);
  }

  getTaskList(): ITask[] {
    return this.savinngData.value;
  }

  getDataAsObservable(): Observable<ITask[]> {
    return this.savinngData.asObservable();
  }
}
