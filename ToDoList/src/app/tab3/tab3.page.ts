import { Component } from '@angular/core';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  completedTasks: Task[] = [];
  sortOrder: string = 'asc'; // Výchozí řazení (nejdříve dokončené)

  constructor(private taskService: TaskService) {}

  ionViewWillEnter() {
    this.completedTasks = this.taskService.getCompletedTasks();
    this.sortCompletedTasks();
  }

  undoTask(index: number) {
    this.taskService.undoTask(index);
    this.completedTasks = this.taskService.getCompletedTasks();
    this.sortCompletedTasks();
  }

  deleteCompletedTask(index: number) {
    this.taskService.deleteCompletedTask(index);
    this.completedTasks = this.taskService.getCompletedTasks();
    this.sortCompletedTasks();
  }

  sortCompletedTasks() {
    this.completedTasks.sort((a, b) => {
      const dateA = new Date(a.completedAt || 0).getTime();
      const dateB = new Date(b.completedAt || 0).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
}
