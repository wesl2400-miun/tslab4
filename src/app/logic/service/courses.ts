import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { URL } from '../ref/url';
import { CourseI } from '../interface/CourseI';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  private http: HttpClient;
  private cacheSubj: BehaviorSubject<CourseI[]>
  private cache$: Observable<CourseI[]>

  constructor(http: HttpClient) {
    this.http = http;
    this.cacheSubj = 
      new BehaviorSubject<CourseI[]>([]);
    this.cache$ = this.cacheSubj
      .asObservable();
  }

  public fromNetwork = (
    ): Subscription => {
    const onError = (err: any) => {
      console.error(err.message);
    }
    return this.http
      .get(URL.COURSES)
      .subscribe({
        next: this.cache,
        error: onError
      });
  }

  private cache = (
    data: any): void => {
    this.cacheSubj.next(
      data as CourseI[]);
  }
}
