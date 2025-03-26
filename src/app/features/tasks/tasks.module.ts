import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskFilterPipe } from '../../shared/pipes/task-filter.pipe';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TaskItemComponent,
    TaskFilterPipe
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TaskFilterPipe
  ]
})
export class TasksModule { }
