import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type NavLink = {
  path: string;
  label: string;
  description: string;
};

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  readonly navLinks: NavLink[] = [
    { path: '/chats', label: 'Chats', description: 'DMs and group chats' },
    { path: '/users', label: 'Users', description: 'Directory and profiles' },
    { path: '/search', label: 'Search', description: 'Messages, users, servers' },
    { path: '/media', label: 'Media', description: 'Files and uploads' },
    { path: '/notifications', label: 'Notifications', description: 'STOMP stream' },
    { path: '/presence', label: 'Presence', description: 'Who is online' }
  ];
}
