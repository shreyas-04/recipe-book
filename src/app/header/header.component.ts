import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private dataStorage: DataStorageService, private authService: AuthService) {}

  authenticty: boolean = false;
  authSub: Subscription;

  ngOnInit() {
    this.authSub = this.authService.user.subscribe((user) => {
      this.authenticty = !!user;
    })
  }
  
  onNav() {
    document.getElementById('nav').classList.toggle('collapse');
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
