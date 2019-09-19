import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CONFIG } from '../app.config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private as: ApiService) {
  }

  getHomePage(): Observable<any[]> {
    return this.getHome();
  }

  private getHome(): Observable<any[]> {
    return this.as.get<any[]>(
      CONFIG.apiUrls.Home
    );
  }

}
