import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Inicio',  icon:'ni-tv-2 text-primary', class: '' },
    { path: '/tables', title: 'Ver Datos',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/dashboard', title: 'Tablero',  icon: 'ni-tv-2 text-orange', class: '' },
    { path: '/user-profile', title: 'Mi Perfil',  icon:'ni-single-02 text-yellow', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
