import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	public apiUrl = 'http://localhost:5047/api/task';
	private tasks: Task[] = [];

	constructor(private http: HttpClient) {
		this.getTasks();
	}

	getTasks(filter: 'todas' | 'pendiente' | 'completado' = 'todas'): Observable<Task[]> {
		let url = this.apiUrl;
		if (filter !== 'todas') {
			url += `?status=${filter}`;
		}
		return this.http.get<Task[]>(url);
	}

	addTask(task: Task): Observable<Task> {
		return this.http.post<Task>(this.apiUrl, task);
	}

	updateTaskStatus(taskId: number, status: string): Observable<Task> {
		const patchDoc = [{ op: 'replace', path: '/status', value: status }];
		return this.http.patch<Task>(`${this.apiUrl}/${taskId}`, patchDoc);
	}

	deleteTask(taskId: number): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
	}
}
