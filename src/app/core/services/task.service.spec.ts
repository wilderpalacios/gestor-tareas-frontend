import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Task } from '../models/task.model';


describe('TaskService', () => {
	let service: TaskService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [TaskService]
		});

		service = TestBed.inject(TaskService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('Se obtiene la lista de tareas', () => {
		const mockTasks: Task[] = [
			{ id: 1, title: 'Tarea 1', status: 'pendiente' },
			{ id: 2, title: 'Tarea 2', status: 'completado' }
		];

		service.getTasks().subscribe(tasks => {
			expect(tasks.length).toBe(2);
			expect(tasks).toEqual(mockTasks);
		});

		const req = httpMock.expectOne(service.apiUrl);
		expect(req.request.method).toBe('GET');
		req.flush(mockTasks);
	});

	it('Se agrega una nueva tarea', () => {
		const newTask: Task = { id: 3, title: 'Nueva tarea', status: 'pendiente' };

		service.addTask(newTask).subscribe(task => {
			expect(task).toEqual(newTask);
		});

		const req = httpMock.expectOne(service.apiUrl);
		expect(req.request.method).toBe('POST');
		req.flush(newTask);
	});

	it('Se actualiza el estado de una tarea', () => {
		const updatedTask: Task = { id: 1, title: 'Tarea 1', description: 'www', status: 'completado' };
		const taskId = 1;
		const newStatus = 'completado';
		let responseTask: Task;

		service.updateTaskStatus(updatedTask.id, updatedTask.status).subscribe((task) => {
			expect(task).toEqual(updatedTask);
		});

		const req = httpMock.expectOne(`${service.apiUrl}/${taskId}`);
		expect(req.request.method).toBe('PATCH');
		req.flush(updatedTask);
	});

	it('Se elimina una tarea', () => {
		const taskId = 1;

		service.deleteTask(taskId).subscribe(response => {
			expect(response).toBeNull();
		});

		const req = httpMock.expectOne(`${service.apiUrl}/${taskId}`);
		expect(req.request.method).toBe('DELETE');
		req.flush(null);
	});
});
