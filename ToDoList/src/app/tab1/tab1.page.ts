import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  taskText: string = ''; // Text z inputu
  tasks: string[] = []; // Seznam úkolů
  completedTasks: string[] = []; // Seznam dokončených úkolů

  constructor() {
    this.loadTasks(); // Načtení úkolů při startu
  }

  addTask() {
    if (this.taskText.trim()) {
      this.tasks.push(this.taskText.trim());
      this.taskText = '';
      this.saveTasks();
    }
  }

  completeTask(index: number) {
    const completedTask = this.tasks.splice(index, 1)[0];
    this.completedTasks.push(completedTask);
    this.saveTasks();
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    const storedCompletedTasks = localStorage.getItem('completedTasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
    if (storedCompletedTasks) {
      this.completedTasks = JSON.parse(storedCompletedTasks);
    }
  }
}
