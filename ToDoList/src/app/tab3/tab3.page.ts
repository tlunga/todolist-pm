import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  completedTasks: string[] = [];

  constructor(private taskService: TaskService) {}

  ionViewWillEnter() {
    this.completedTasks = this.taskService.getCompletedTasks();
  }

  undoTask(index: number) {
    this.taskService.undoTask(index);
    this.completedTasks = this.taskService.getCompletedTasks();
  }

  deleteCompletedTask(index: number) {
    this.taskService.deleteCompletedTask(index);
    this.completedTasks = this.taskService.getCompletedTasks();
  }
}
