import { Component } from '@angular/core';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  showFavoritesOnly: boolean = false;
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
    this.tasks = this.taskService.getTasks();
    this.categories = this.taskService.getCategories();
    this.updateAvailableMonths();
    this.filterTasks();
  }

  completeTask(taskId: string) {
    this.taskService.completeTask(taskId);
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  toggleTaskDetails(taskId: string) {
    this.expandedTaskId = this.expandedTaskId === taskId ? null : taskId;
  }
  
  toggleFavorite(taskId: string) {
    this.taskService.toggleFavorite(taskId);
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
    this.tasks = this.taskService.getTasks();
    this.filterTasks();
  }

  updateAvailableMonths() {
    const uniqueMonths = new Set<string>();
    this.tasks.forEach(task => {
      const taskMonth = new Date(task.created).getMonth() + 1;
      uniqueMonths.add(taskMonth.toString().padStart(2, '0'));
    });

    this.availableMonths = Array.from(uniqueMonths)
      .map(month => ({
        value: month,
        label: this.getMonthLabel(month)
      }))
      .sort((a, b) => parseInt(a.value) - parseInt(b.value));
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(task => {
      const taskMonth = new Date(task.created).getMonth() + 1;
      const monthMatch = this.selectedMonth === 'all' || taskMonth.toString().padStart(2, '0') === this.selectedMonth;
      const priorityMatch = this.selectedPriority === 'all' || task.priority === this.selectedPriority;
      const categoryMatch = this.selectedCategory === 'all' || task.category === this.selectedCategory;
      const searchMatch = this.searchQuery.trim() === '' || task.text.toLowerCase().includes(this.searchQuery.toLowerCase());
      const favoriteMatch = !this.showFavoritesOnly || task.isFavorite;
      const deadlineMatch = !this.showOnlyWithDeadline || !!task.dueDate;
      
      return monthMatch && priorityMatch && categoryMatch && searchMatch && favoriteMatch && deadlineMatch;
    });

    this.filteredTasks.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      return 0;
    });
  }

  sortTasks() {
    this.filteredTasks.sort((a, b) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
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
