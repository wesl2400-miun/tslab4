import { Component } from '@angular/core';
import { Courses } from '../../../logic/service/courses';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LabelI } from '../../../logic/interface/LabelI';
import { LABEL } from '../../../logic/ref/label';
import { CourseI } from '../../../logic/interface/CourseI';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  public courses$: Observable<CourseI[]>
  public label: LabelI;

  constructor(courses: Courses) {
    this.courses$ = 
      courses.sorted$();
    this.label = LABEL;
  }
}
