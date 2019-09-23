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
  propositions = [];
  toggleLink = false;
  toggleLinkProp = false;

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

        if (this.isPublicOffering()) {
          this.hs
            .getPropositionsById('01130549')
            .pipe(
              takeUntil(this.destroyedSubject),
              finalize(() => {
                this.cdr.markForCheck();
              })
            )
            .subscribe(response => {
              this.propositions = response;
            });
        }
      });


  }

  get founders(): any[] {
    return this.response.oCommonInfoBot.beneficiaries;
  }

  isPublicOffering() {
    const publ = this.response.aListRegistry.filter(res => res.sID_Registry === 'PublicOffering');

    return publ.length > 0;
  }

  ngOnDestroy(): void {
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

}
