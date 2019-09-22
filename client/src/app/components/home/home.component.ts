import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

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
        console.log(response);
      });
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
