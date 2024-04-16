import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../Services/Tasks/tasks.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  selectedProject: number | undefined;
  tasks: any[] | undefined;
  projects: any[] | undefined;
  showAddTaskForm: boolean = false;
  newTask: any = {
    title: '',
    description: '',
    assignedTo: '',
    status: 0, // Default status: Active
    projectId: 0 // You may need to set the project ID
  };

  constructor(private http: HttpClient, private tasksService: TasksService) { }

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.http.get<any[]>('https://localhost:7255/api/Projects')
      .subscribe(projects => {
        this.projects = projects;
      });
  }

  getTasksByProject(): void {
    console.log('Fetching tasks for project:', this.selectedProject);
    if (this.selectedProject) {
      this.http.get<any[]>(`https://localhost:7255/api/Tasks?projectId=${this.selectedProject}`)
        .subscribe(
          tasks => {
            console.log('Received tasks:', tasks);
            this.tasks = tasks;
          },
          error => {
            console.error('Error fetching tasks:', error);
            this.tasks = [];
          }
        );
    } else {
      // Handle case when no project is selected
      this.tasks = [];
    }
  }




  filterTasksByStatus(status: number): any[] {
    return this.tasks ? this.tasks.filter(task => task.status === status) : [];
  }

  onProjectChange(projectId: number): void {
    console.log('Selected project:', projectId);
  }

  openAddTaskForm(): void {
    this.showAddTaskForm = true;
  }

  addTask(): void {
    this.newTask.projectId = this.selectedProject;
    this.http.post<any>('https://localhost:7255/api/Tasks', this.newTask)
      .subscribe(response => {
        console.log('New task added:', response);
        // Reset form and hide it
        this.newTask = {
          title: '',
          description: '',
          assignedTo: '',
          status: 0
        };
        this.showAddTaskForm = false;
        // Refresh task list
        this.getTasksByProject();
      });
  }

}
