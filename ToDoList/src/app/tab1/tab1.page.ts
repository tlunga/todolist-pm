import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../task.service';
import { DynamicTextService } from '../dynamic-text/dynamic-text.service';
import { Subscription } from 'rxjs';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';


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
  taskImage?: string; // Přidaná proměnná pro obrázek
  private textSubscription!: Subscription;

  showDeadlinePicker: boolean = false; // Stav pro zobrazení kalendáře

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

  toggleDeadlinePicker() {
    this.showDeadlinePicker = !this.showDeadlinePicker;
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64, // Base64 formát pro snadné uložení
        source: CameraSource.Camera
      });

      if (image.base64String) {
        this.taskImage = `data:image/jpeg;base64,${image.base64String}`;
      }
    } catch (error) {
      console.error("Chyba při pořizování fotografie:", error);
    }
  }

  addTask() {
    if (this.taskText.trim()) {
      this.taskService.addTask(this.taskText.trim(), this.taskDescription.trim(), this.taskPriority, this.selectedCategory, this.taskDueDate, this.taskImage);
      this.taskText = '';
      this.taskDescription = '';
      this.taskPriority = '!';
      this.selectedCategory = '';
      this.taskDueDate = undefined;
      this.showDeadlinePicker = false;
      this.taskImage = undefined;
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
