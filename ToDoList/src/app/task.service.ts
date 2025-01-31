import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: string[] = [];
  private completedTasks: string[] = [];

  constructor() {
    this.loadTasks();
  }

  addTask(task: string) {
    this.tasks.push(task);
    this.saveTasks();
  }

  completeTask(index: number) {
    const completedTask = this.tasks.splice(index, 1)[0];
    this.completedTasks.push(completedTask);
    this.saveTasks();
  }

  undoTask(index: number) {
    const task = this.completedTasks.splice(index, 1)[0];
    this.tasks.push(task);
    this.saveTasks();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  deleteCompletedTask(index: number) {
    this.completedTasks.splice(index, 1);
    this.saveTasks();
  }

  getTasks(): string[] {
    return this.tasks;
  }

  getCompletedTasks(): string[] {
    return this.completedTasks;
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
  }

  private loadTasks() {
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
