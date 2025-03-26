import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../../core/models/task.model';

@Component({
	selector: 'app-task-form',
	standalone: false,
	templateUrl: './task-form.component.html',
	styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
	taskForm: FormGroup;
	@Output() taskCreated = new EventEmitter<Task>();

	constructor(private fb: FormBuilder) {
		this.taskForm = this.fb.group({
			title: ['', [Validators.required, Validators.minLength(3)]],
			description: ['', Validators.required],
			status: ['pendiente', Validators.required],
		});
	}

	submitForm() {
		if (this.taskForm.valid) {
			this.taskCreated.emit(this.taskForm.value);
			this.taskForm.reset({ status: 'pendiente' });
		}
	}
}
