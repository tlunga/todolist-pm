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
  filteredCompletedTasks: Task[] = [];
  showOnlyWithDeadline: boolean = false;
  expandedTaskId: string | null = null; 

  sortOrder: string = 'asc';
  selectedMonth: string = 'all';
  selectedPriority: string = 'all';
  selectedCategory: string = 'all';
  searchQuery: string = '';

  availableMonths: { value: string, label: string }[] = [];
  categories: string[] = [];

  constructor(private taskService: TaskService) {}

  ionViewWillEnter() {
    this.completedTasks = this.taskService.getCompletedTasks();
    this.categories = this.taskService.getCategories();
    this.updateAvailableMonths();
    this.filterCompletedTasks();
  }

  undoTask(taskId: string) {
    this.taskService.undoTask(taskId);
    this.completedTasks = this.taskService.getCompletedTasks();
    this.updateAvailableMonths();
    this.filterCompletedTasks();
  }

  toggleTaskDetails(taskId: string) {
    this.expandedTaskId = this.expandedTaskId === taskId ? null : taskId;
  }

  deleteCompletedTask(taskId: string) {
    this.taskService.deleteCompletedTask(taskId);
    this.completedTasks = this.taskService.getCompletedTasks();
    this.updateAvailableMonths();
    this.filterCompletedTasks();
  }

  updateAvailableMonths() {
    const uniqueMonths = new Set<string>();
    this.completedTasks.forEach(task => {
      if (task.completedAt) {
        const taskMonth = new Date(task.completedAt).getMonth() + 1;
        uniqueMonths.add(taskMonth.toString().padStart(2, '0'));
      }
    });

    this.availableMonths = Array.from(uniqueMonths)
      .map(month => ({
        value: month,
        label: this.getMonthLabel(month)
      }))
      .sort((a, b) => parseInt(a.value) - parseInt(b.value));
  }

  filterCompletedTasks() {
    this.filteredCompletedTasks = this.completedTasks.filter(task => {
      const taskMonth = task.completedAt ? new Date(task.completedAt).getMonth() + 1 : null;
      const monthMatch = this.selectedMonth === 'all' || (taskMonth && taskMonth.toString().padStart(2, '0') === this.selectedMonth);
      const priorityMatch = this.selectedPriority === 'all' || task.priority === this.selectedPriority;
      const categoryMatch = this.selectedCategory === 'all' || task.category === this.selectedCategory;
      const searchMatch = this.searchQuery.trim() === '' || task.text.toLowerCase().includes(this.searchQuery.toLowerCase());
      const deadlineMatch = !this.showOnlyWithDeadline || !!task.dueDate;

      return monthMatch && priorityMatch && categoryMatch && searchMatch && deadlineMatch;
    });

    this.sortCompletedTasks();
  }

  sortCompletedTasks() {
    this.filteredCompletedTasks.sort((a, b) => {
      const dateA = new Date(a.completedAt || 0).getTime();
      const dateB = new Date(b.completedAt || 0).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  getMonthLabel(month: string): string {
    const months: { [key: string]: string } = {
      '01': 'Leden', '02': 'Únor', '03': 'Březen', '04': 'Duben',
      '05': 'Květen', '06': 'Červen', '07': 'Červenec', '08': 'Srpen',
      '09': 'Září', '10': 'Říjen', '11': 'Listopad', '12': 'Prosinec'
    };
    return months[month] || 'Neznámý';
  }
}
