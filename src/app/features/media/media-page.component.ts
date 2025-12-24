import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './media-page.component.html',
  styleUrl: './media-page.component.scss'
})
export class MediaPageComponent {}
