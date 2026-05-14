import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { URL } from '../ref/url';
import { CourseI } from '../interface/CourseI';
import { onError } from '../util/utils';
import { map } from 'rxjs';
import { FILTER } from '../ref/filter';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  private http: HttpClient;
  private cacheSbj: BehaviorSubject<CourseI[]>
  private cache$: Observable<CourseI[]>
  private filtSbj: BehaviorSubject<string>
  private filter$: Observable<string>

  constructor(http: HttpClient) {
    this.http = http;
    this.cacheSbj = 
      new BehaviorSubject<CourseI[]>([]);
    this.cache$ = this.cacheSbj
      .asObservable();
    this.filtSbj =
      new BehaviorSubject<string>(
        FILTER.ORG);
    this.filter$ = this.filtSbj
      .asObservable();
  }

  // Uppdatera sorteringsflaggan
  public switchFilter = (
    filter: string): void => {
    this.filtSbj.next(filter);
  }

  public fromNetwork = (
    ): Subscription => {
    return this.http
      .get(URL.COURSES)
      .subscribe({
        next: this.cache,
        error: onError
      });
  }

  private cache = (
    data: any): void => {
    this.cacheSbj.next(
      data as CourseI[]);
  }

  public sorted$ = (
    ): Observable<CourseI[]> => {
    return combineLatest([
      this.filter$, this.cache$])
      .pipe(map(
        ([filter, courses]) => {
        if(filter === FILTER.ORG)
          return courses;
        const copy = 
          [...courses];
          return this.sortedBy(
            copy, filter); 
        }
      ));
  }

  private sortedBy = (
    courses: CourseI[],
    field: string): CourseI[] => {
    const compare = (a: CourseI, 
      b: CourseI): number => {
      const prop = field as 
        keyof CourseI;
      if(a[prop] > b[prop]) 
        return 1;
      else if(a[prop] < b[prop])
        return -1;
      return 0;
    }
    return courses
      .sort(compare);
  }
}
