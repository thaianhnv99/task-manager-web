import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TaskManagerModule} from "./task-manager/task-manager.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TaskManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
