import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemNotificationService } from '../../../core/services/item-notification.service';
import { TokenService } from '../../../core/auth/token.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent implements OnInit {
  itemForm!: FormGroup;
  userId: number | null;
  isSubmitting = false;

  categories: any[] = [];
  itemTypes = [
    { value: 'telephone', label: 'Téléphone' },
    { value: 'carte', label: 'Carte d\'identité' },
    { value: 'passeport', label: 'Passeport' }
  ];
  
  constructor(
    private fb: FormBuilder,
    private itemService: ItemNotificationService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.userId = this.tokenService.getUserId();
  }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      type_id: ['', Validators.required],
      name: ['', Validators.required],
      unique_number: ['', Validators.required],
      description: [''],
      status: ['Perdu']
    });
    this.getCategory();
  }
  getCategory(){
    this.itemService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }
  addItem(): void {
    
    if (this.itemForm.invalid || !this.userId) return;
    
    const item = this.itemForm.value;
    console.log(item);
    
    this.isSubmitting = true;
    this.itemService.createItem(item).subscribe({
      next: () => {
        this.router.navigate(['/user-dashboard']);
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }
  goBackToList() {
    window.history.back();
  }
} 
