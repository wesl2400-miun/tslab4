import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { CourseI } from '../interface/CourseI';
import { map } from 'rxjs';
import { foundPhrase } from '../util/utils';

@Injectable({
  providedIn: 'root',
})
export class Finder {
  private searchSbj: BehaviorSubject<string>
  public search$: Observable<string>

  constructor() {
    this.searchSbj =
      new BehaviorSubject('');
    this.search$ = this.searchSbj
      .asObservable();
  }

  public updSearch = (
    search: string): void => {
    this.searchSbj.next(search);
  }

  public found = (
    search: string,
    courses: CourseI[]): CourseI[] => {
    const copy = [...courses];
    return copy.filter(
      course => this.isFound(
        search, course));
  }

  private isFound = (
    search: string,
    course: CourseI): boolean => {
    const { code, 
      coursename } = course;
    console.log(search, code)
    return foundPhrase(
      code, search) 
      || foundPhrase(
        coursename, 
        search);
  }
}
