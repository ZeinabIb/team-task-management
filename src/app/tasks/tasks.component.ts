import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../Services/Tasks/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.tasksService.getTasks()
      .subscribe(
        tasks => {
          this.tasks = tasks;
        },
        error => {
          console.error('Error fetching tasks:', error);
        }
      );
  }
}
