import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {IPiorites, ITask} from "../../models/task-model";
import {FormControl} from "@angular/forms";
import {combineLatest, Subject} from "rxjs";
import {SelectionModel} from '@angular/cdk/collections';
import {debounceTime, distinctUntilChanged, filter, map, pluck, startWith, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit, OnDestroy {
  taskList: ITask[] = [];
  searchTask = new FormControl('');

  selectionModel = new SelectionModel(true);
  taskSelected: ITask[] = [];

  destroy$ = new Subject();

  piorityList: IPiorites[] = [
    {label: 'low', value: 'low'},
    {label: 'normal', value: 'normal'},
    {label: 'high', value: 'high'},
  ]

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.onSearchTask();

    this.selectionModel.changed
      .pipe(pluck('source', 'selected'))
      .subscribe((selected) => {
        this.taskSelected = selected as ITask[]
      });
  }

  onSearchTask() {
    const search$ = this.searchTask.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), startWith(' '));
    combineLatest([this.taskService.getDataAsObservable(), search$]).pipe(
      filter(([taskList]) => !!taskList),
      map(([taskList, textSearch]) => {
        return this.doSearch(taskList, textSearch);
      }),
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.taskList = res;
      this.selectionModel.clear();
    })
  }

  doSearch(taskList: ITask[], textSearch: string): ITask[] {
    const textValue = this.normalizeText(textSearch);

    return taskList.filter(task => (this.normalizeText(task.taskTitle).includes(textValue)));
  }

  normalizeText(text?: string) {
    return (text || '').replace(/ /g, '').toLocaleLowerCase();
  }

  remove(value: ITask) {
    this.taskService.removeTask(value);
  }

  updateTask(value: ITask) {
    this.taskService.updateTask(value);
  }

  removeTaskSelect() {
    this.taskService.removeTaskSelected(this.taskSelected);
    //wait call api to triggle clear selected
    this.selectionModel.clear();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
