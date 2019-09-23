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

  getHomePageById(id: string): Observable<any> {
    const query = {
      query: { code: id },
    };

    return this.getHome(query);
  }

  getPropositionsById(id: string): Observable<any> {
    const query = {
      query: { code: id },
    };

    return this.getPropositions(query);
  }

  private getHome(query): Observable<any> {
    return this.as.get<any>(
      CONFIG.apiUrls.Home,
      query.query
    );
  }

  private getPropositions(query): Observable<any> {
    return this.as.get<any>(
      CONFIG.apiUrls.Propositions,
      query.query
    );
  }

}
