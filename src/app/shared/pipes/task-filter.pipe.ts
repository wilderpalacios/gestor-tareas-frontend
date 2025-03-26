import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../core/models/task.model';

@Pipe({
	name: 'taskFilter',
	standalone: false
})
export class TaskFilterPipe implements PipeTransform {

	transform(tasks: Task[], status: 'pendiente' | 'completado' | 'todas'): Task[] {
		if (status === 'todas') return tasks;
		return tasks.filter(task => task.status === status);
	}
}
