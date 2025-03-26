import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskService } from './core/services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			positionClass: 'toast-top-right',
			timeOut: 3000,
			preventDuplicates: true,
		}),
		HttpClientModule,
		ReactiveFormsModule
	],
	providers: [TaskService],
	bootstrap: [AppComponent]
})
export class AppModule { }
