import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { FILTER } from '../ref/filter';
import { CourseI } from '../interface/CourseI';

@Injectable({
  providedIn: 'root',
})
export class Sorter {
  private filtSbj: BehaviorSubject<string>
  public filter$: Observable<string>

  constructor() {
    this.filtSbj = 
      new BehaviorSubject(
        FILTER.ORG);
    this.filter$ = this.filtSbj
      .asObservable();
  }

  public sort = (
    filter: string) => {
    this.filtSbj.next(filter);
  }

  public sorted = (
    filter: string,
    courses: CourseI[]
    ): CourseI[] => {
    if(filter === FILTER.ORG)
      return courses;
    const copy = [...courses];
    return this.sortedBy(
      copy, filter); 
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
