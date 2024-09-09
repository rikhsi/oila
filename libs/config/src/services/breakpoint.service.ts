import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BREAKPOINT } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  #isSmallMobile = new BehaviorSubject<boolean>(false);
  isSmallMobile$ = this.#isSmallMobile.asObservable();

  #isMobile = new BehaviorSubject<boolean>(false);
  isMobile$ = this.#isMobile.asObservable();

  #isTablet = new BehaviorSubject<boolean>(false);
  isTablet$ = this.#isTablet.asObservable();

  #isDesktop = new BehaviorSubject<boolean>(false);
  isDesktop$ = this.#isDesktop.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {}

  observe$(): Observable<BreakpointState> {
    return this.breakpointObserver.observe(Object.values(BREAKPOINT)).pipe(
      tap((state) => {
        this.#isSmallMobile.next(state.breakpoints[BREAKPOINT.maxWidth378]),
          this.#isMobile.next(state.breakpoints[BREAKPOINT.maxWidth768]);
        this.#isTablet.next(
          state.breakpoints[BREAKPOINT.minWidth769] &&
            state.breakpoints[BREAKPOINT.maxWidth1199]
        );
        this.#isDesktop.next(state.breakpoints[BREAKPOINT.minWidth1200px]);
      })
    );
  }
}
