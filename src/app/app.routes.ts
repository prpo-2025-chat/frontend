import { Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';
import { AuthPageComponent } from './features/auth/auth-page.component';
import { ChatsPageComponent } from './features/chats/chats-page.component';
import { UsersPageComponent } from './features/users/users-page.component';
import { SearchPageComponent } from './features/search/search-page.component';
import { NotificationsPageComponent } from './features/notifications/notifications-page.component';
import { PresencePageComponent } from './features/presence/presence-page.component';
import { MediaPageComponent } from './features/media/media-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'chats',
        pathMatch: 'full'
      },
      {
        path: 'chats',
        component: ChatsPageComponent
      },
      {
        path: 'users',
        component: UsersPageComponent
      },
      {
        path: 'search',
        component: SearchPageComponent
      },
      {
        path: 'notifications',
        component: NotificationsPageComponent
      },
      {
        path: 'presence',
        component: PresencePageComponent
      },
      {
        path: 'media',
        component: MediaPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
