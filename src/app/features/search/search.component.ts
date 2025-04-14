import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemNotificationService } from '../../core/services/item-notification.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  query = '';
  loading = false;
  results: any[] = [];
  error: string | null = null;
  searched = false;

  constructor(private itemService: ItemNotificationService) {}

  search() {
    this.loading = true;
    this.error = null;
    this.results = [];
    this.searched = false;

    this.itemService.searchWithOwner(this.query).subscribe({
      next: (res) => {
        this.results = [
          {
            type: res.item.name,
            description: res.item.description,
            found: res.item.status === 'Retrouvé',
            owner: {
              full_name: `${res.owner.first_name} ${res.owner.last_name}`,
              email: res.owner.email,
              phone: res.owner.phone
            }
          }
        ];
        this.searched = true;
        this.loading = false;
      },
      error: () => {
        this.error = 'Aucun objet trouvé ou une erreur est survenue.';
        this.searched = true;
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }
}
