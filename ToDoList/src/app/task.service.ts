import { Injectable } from '@angular/core';

export interface Task {
  id: string;
  text: string;
  description: string;
  priority: string;
  category?: string;
  created: string;
  dueDate?: string;
  completedAt?: string;
  isFavorite?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private completedTasks: Task[] = [];
  private categories: string[] = [];

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
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  addTask(taskText: string, taskDescription: string, taskPriority: string, category?: string, dueDate?: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: taskText,
      description: taskDescription || '',
      priority: taskPriority || '!',
      category: category || '',
      created: this.generateRandomDate().toISOString(),
      dueDate: dueDate ? new Date(dueDate).toISOString().split('T')[0] : undefined // Uložíme pouze datum bez času
    };
    this.tasks.push(newTask);
    this.saveTasks();
  }

  completeTask(taskId: string) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const completedTask = this.tasks.splice(taskIndex, 1)[0];
      completedTask.completedAt = new Date().toISOString();
      this.completedTasks.push(completedTask);
      this.saveTasks();
    }
  }

  undoTask(taskId: string) {
    const taskIndex = this.completedTasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const task = this.completedTasks.splice(taskIndex, 1)[0];
      delete task.completedAt;
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

  getCategories(): string[] {
    return this.categories;
  }

  addCategory(category: string) {
    if (!this.categories.includes(category)) {
      this.categories.push(category);
      this.saveTasks();
    }
  }

  deleteCategory(category: string) {
    this.categories = this.categories.filter(cat => cat !== category);
    this.tasks.forEach(task => {
      if (task.category === category) {
        task.category = '';
      }
    });
    this.saveTasks();
  }

  private loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    const storedCompletedTasks = localStorage.getItem('completedTasks');
    const storedCategories = localStorage.getItem('categories');

    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.completedTasks = storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [];
    this.categories = storedCategories ? JSON.parse(storedCategories) : [];
  }

  private generateRandomDate(): Date {
    const now = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    
    // Náhodné číslo mezi datem před rokem a dnešním dnem
    const randomTime = oneYearAgo.getTime() + Math.random() * (now.getTime() - oneYearAgo.getTime());
    return new Date(randomTime);
  }
}
