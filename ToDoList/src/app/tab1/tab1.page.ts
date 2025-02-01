import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../task.service';
import { DynamicTextService } from '../dynamic-text/dynamic-text.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit, OnDestroy {
  taskText: string = '';
  taskDescription: string = '';
  taskPriority: string = '!';
  taskDueDate?: string;
  selectedCategory: string = ''; // Vybraná kategorie
  newCategory: string = ''; // Nová kategorie
  categoryToDelete: string = ''; // Kategorie k odstranění
  categories: string[] = []; // Seznam kategorií
  dynamicText: string = ''; 
  private textSubscription!: Subscription;

  constructor(
    private taskService: TaskService,
    private dynamicTextService: DynamicTextService
  ) {}

  ngOnInit() {
    this.categories = this.taskService.getCategories();
    this.textSubscription = this.dynamicTextService.text$.subscribe(
      (text) => {
        this.dynamicText = text;
      }
    );
  }

  ngOnDestroy() {
    if (this.textSubscription) {
      this.textSubscription.unsubscribe();
    }
  }

  addTask() {
    if (this.taskText.trim()) {
      this.taskService.addTask(this.taskText.trim(), this.taskDescription.trim(), this.taskPriority, this.selectedCategory, this.taskDueDate);
      this.taskText = '';
      this.taskDescription = '';
      this.taskPriority = '!';
      this.selectedCategory = '';
      this.taskDueDate = undefined;
    }
  }

  addCategory() {
    if (this.newCategory.trim()) {
      this.taskService.addCategory(this.newCategory.trim());
      this.categories = this.taskService.getCategories();
      this.newCategory = '';
    }
  }

  deleteCategory() {
    if (this.categoryToDelete) {
      this.taskService.deleteCategory(this.categoryToDelete);
      this.categories = this.taskService.getCategories();
      this.categoryToDelete = '';
    }
  }
}
