import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-presence-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './presence-page.component.html',
  styleUrl: './presence-page.component.scss'
})
export class PresencePageComponent {}
