import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  response;
  toggleLink = false;

  protected destroyedSubject = new Subject<void>();

  constructor(
    private hs: HomeService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

    this.hs
      .getHomePageById('01130549')
      .pipe(
        takeUntil(this.destroyedSubject),
        finalize(() => {
          this.cdr.markForCheck();
        })
      )
      .subscribe(response => {
        this.response = response;
      });
  }

  // get employees(): any[] {
    // return (this.response.results || [])
    //   .filter(modelId => this.response.references[modelId].ObjectClass === ObjectClass.Employee)
    //   .map(modelId => this.response.references[modelId]) as Employee[];
  // }

  get founders(): any[] {
    return this.response.oCommonInfoBot.beneficiaries;
  }

  onSort(event): void {
    const sortPropDir = event.sorts[ 0 ];
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
