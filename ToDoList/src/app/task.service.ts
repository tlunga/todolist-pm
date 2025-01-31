import { Injectable } from '@angular/core';

export interface Task {
  text: string;
  created: string; // Datum uložené ve formátu ISO
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private completedTasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  addTask(taskText: string) {
    const newTask: Task = {
      text: taskText,
      created: this.generateRandomDate().toISOString()
    };
    this.tasks.push(newTask);
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

  getTasks(): Task[] {
    return this.tasks;
  }

  getCompletedTasks(): Task[] {
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

  // Funkce generující náhodný datum a čas v rámci posledního roku
  private generateRandomDate(): Date {
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    const randomTime = oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime());
    return new Date(randomTime);
  }
}
