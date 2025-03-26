import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../../core/services/task.service';
import { Task } from '../../../../core/models/task.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-task-list',
	standalone: false,
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.scss',
	animations: [
		trigger('fadeInOut', [
			state('void', style({ opacity: 0, transform: 'scale(0.9)' })),
			transition(':enter', [animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
			transition(':leave', [animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))]),
		]),
	],
})
export class TaskListComponent implements OnInit {
	tasks: Task[] = [];
	filter: 'todas' | 'pendiente' | 'completado' = 'todas';
	mostrarDropdown = false;
	showForm: boolean = false;

	constructor(private taskService: TaskService, private toastr: ToastrService) { }

	ngOnInit() {
		this.getTasks();
	}

	addTask(task: Task) {
		this.taskService.addTask(task).subscribe((data) => {
			this.getTasks();
			this.showForm = false;
			this.toastr.success('Tarea creada exitosamente.');
		});
	}

	toggleTaskStatus(task: Task) {
		const newStatus = task.status === 'pendiente' ? 'completado' : 'pendiente';
		this.taskService.updateTaskStatus(task.id, newStatus).subscribe((resp) => {
			this.getTasks();
			this.toastr.info('Tarea actualizada exitosamente.');
		});
	}

	deleteTask(id: number) {
		this.taskService.deleteTask(id).subscribe((resp) => {
			this.toastr.error('Tarea eliminada exitosamente.');
			this.getTasks();
		});
	}

	getTasks() {
		return this.taskService.getTasks().subscribe((tasks) => {
			this.tasks = tasks;
		});
	}

	changeFilter(filter: 'todas' | 'pendiente' | 'completado') {
		this.filter = filter;
		this.taskService.getTasks(filter).subscribe(tasks => {
			this.tasks = tasks;
		});
		this.mostrarDropdown = false;
	}

	toggleTaskForm() {
		this.showForm = !this.showForm;
	}
}
