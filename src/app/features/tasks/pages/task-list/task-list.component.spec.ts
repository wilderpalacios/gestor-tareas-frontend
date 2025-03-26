import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../../../core/services/task.service';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TaskListComponent', () => {
	let component: TaskListComponent;
	let fixture: ComponentFixture<TaskListComponent>;
	let mockTaskService: jasmine.SpyObj<TaskService>;

	beforeEach(async () => {
		TestBed.configureTestingModule({
			imports: [ToastrModule.forRoot()]
		});
		mockTaskService = jasmine.createSpyObj('TaskService', ['getTasks']);
		mockTaskService.getTasks.and.returnValue(
			of([
				{ id: 1, title: 'Tarea 1', description: 'Descripción 1', status: 'pendiente' },
				{ id: 2, title: 'Tarea 2', description: 'Descripción 2', status: 'completado' }
			])
		);

		await TestBed.configureTestingModule({
			declarations: [TaskListComponent],
			providers: [{ provide: TaskService, useValue: mockTaskService }]
		}).compileComponents();

		fixture = TestBed.createComponent(TaskListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('Se renderiza la lista de tareas', () => {
		const taskElements = fixture.debugElement.queryAll(By.css('.task-item'));
		expect(taskElements.length).toBe(2);
		expect(taskElements[0].nativeElement.textContent).toContain('Tarea 1');
		expect(taskElements[1].nativeElement.textContent).toContain('Tarea 2');
	});
});
