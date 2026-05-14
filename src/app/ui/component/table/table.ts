import { Component } from '@angular/core';
import { Courses } from '../../../logic/service/courses';
import { FILTER } from '../../../logic/ref/filter';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  private courses: Courses;
  private subs: Subscription;

  constructor(courses: Courses) {
    this.courses = courses;
    this.subs = new Subscription();
  }

  // Temporär kod för testning
  public ngOnInit() {
    this.subs.add(
      this.sorted());
    this.courses.switchFilter(
      FILTER.ORG);
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // Temporär kod för testning
  private sorted = (
    ): Subscription => {
    return this.courses.sorted$()
      .subscribe(data => {
        console.log(
          'From table', data);
      });
  }
}
