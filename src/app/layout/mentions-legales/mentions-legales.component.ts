import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './mentions-legales.component.html',
  styleUrl: './mentions-legales.component.scss'
})
export class MentionsLegalesComponent {
contactEmail: string = "troqv.service@gmail.com"
}
