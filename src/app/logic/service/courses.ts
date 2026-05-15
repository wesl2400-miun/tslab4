import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { URL } from '../ref/url';
import { CourseI } from '../interface/CourseI';
import { onError } from '../util/utils';
@Injectable({
  providedIn: 'root',
})
export class Courses {
  private http: HttpClient;
  private cacheSbj: BehaviorSubject<CourseI[]>
  public cache$: Observable<CourseI[]>
  
  // Definiera HttpClient och ett Rx-kursflöde
  constructor(http: HttpClient) {
    this.http = http;
    this.cacheSbj = 
      new BehaviorSubject<CourseI[]>([]);
    this.cache$ = this.cacheSbj
      .asObservable();
  }

  // Hämta kurserna från den angivna URL:en och
  // lyssna efter eventuella uppdateringar
  public fromNetwork = (
    ): Subscription => {
    return this.http
      .get(URL.COURSES)
      .subscribe({
        next: this.cache,
        error: onError
      });
  }

  // Cacha kurserna i ett Rx-flöde
  private cache = (
    data: any): void => {
    this.cacheSbj.next(
      data as CourseI[]);
  }
}
