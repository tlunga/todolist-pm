import { Injectable } from '@angular/core';

export interface Task {
  id: string;
  text: string;
  description: string;
  priority: string;
  created: string;
  completedAt?: string;
  isFavorite?: boolean; // Nový atribut pro oblíbené úkoly
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

  toggleFavorite(taskId: string) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.isFavorite = !task.isFavorite;
      this.saveTasks();
    }
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
  }

  addTask(taskText: string, taskDescription: string, taskPriority: string) {
    const newTask: Task = {
      id: crypto.randomUUID(), // Unikátní ID
      text: taskText,
      description: taskDescription || ' ',
      priority: taskPriority || '!',
      created: this.generateRandomDate().toISOString()
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }
  

  completeTask(taskId: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const completedTask = this.tasks.splice(taskIndex, 1)[0];
      completedTask.completedAt = new Date().toISOString(); // Nastavení aktuálního data a času
      this.completedTasks.push(completedTask);
      this.saveTasks();
    }
  }
  

  undoTask(taskId: string) {
    const taskIndex = this.completedTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const task = this.completedTasks.splice(taskIndex, 1)[0];
      delete task.completedAt; // Odebrání data dokončení
      this.tasks.push(task);
      this.saveTasks();
    }
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  deleteCompletedTask(taskId: string) {
    this.completedTasks = this.completedTasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getCompletedTasks(): Task[] {
    return this.completedTasks;
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

  private generateRandomDate(): Date {
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    const randomTime = oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime());
    return new Date(randomTime);
  }
}
