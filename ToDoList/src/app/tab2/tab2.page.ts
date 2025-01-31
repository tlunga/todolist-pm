import { Component } from '@angular/core';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ionViewWillEnter() {
    this.tasks = this.taskService.getTasks();
  }

  completeTask(index: number) {
    this.taskService.completeTask(index);
    this.tasks = this.taskService.getTasks();
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(index);
    this.tasks = this.taskService.getTasks();
  }
}
