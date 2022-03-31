import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskManagerComponent} from "./task-manager.component";
import {NewTaskComponent} from "./component/new-task/new-task.component";
import {ListTaskComponent} from "./component/list-task/list-task.component";
import {PioritySelectComponent} from './shared-ui/piority-select/piority-select.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AccordionComponent} from './shared-ui/accordion/accordion.component';
import {AccordionContentDirective} from "./shared-ui/accordion/directives/accordion-content.directive";
import {AccordionHeaderDirective} from "./shared-ui/accordion/directives/accordion-header.directive";
import {AccordionItemDirective} from "./shared-ui/accordion/directives/accordion-item.directive";
import {ToggleFipe} from "./pipe/toggle.pipe";
import { TaskFormComponent } from './component/task-form/task-form.component';

@NgModule({
  declarations: [
    TaskManagerComponent,
    NewTaskComponent,
    ListTaskComponent,
    PioritySelectComponent,
    AccordionComponent,
    AccordionContentDirective,
    AccordionHeaderDirective,
    AccordionItemDirective,
    ToggleFipe,
    TaskFormComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [TaskManagerComponent, ToggleFipe]
})
export class TaskManagerModule {
}
