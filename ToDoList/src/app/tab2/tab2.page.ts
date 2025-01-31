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
  sortOrder: string = 'asc'; // Výchozí řazení (nejstarší první)

  constructor(private taskService: TaskService) {}

  ionViewWillEnter() {
    this.tasks = this.taskService.getTasks();
    this.sortTasks();
  }

  completeTask(index: number) {
    this.taskService.completeTask(index);
    this.tasks = this.taskService.getTasks();
    this.sortTasks();
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(index);
    this.tasks = this.taskService.getTasks();
    this.sortTasks();
  }

  sortTasks() {
    this.tasks.sort((a, b) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
}
