import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  taskText: string = '';

  constructor(private taskService: TaskService) {}

  addTask() {
    if (this.taskText.trim()) {
      this.taskService.addTask(this.taskText.trim());
      this.taskText = '';
    }
  }
}
