import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  tasks: string[] = [];

  constructor(private taskService: TaskService) {}

  ionViewWillEnter() {
    this.tasks = this.taskService.getTasks();
  }

  completeTask(index: number) {
    this.taskService.completeTask(index);
    this.tasks = this.taskService.getTasks();
  }
}
