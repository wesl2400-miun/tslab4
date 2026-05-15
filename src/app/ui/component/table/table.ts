import { Component } from '@angular/core';
import { Courses } from '../../../logic/service/courses';
import { combineLatest, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LabelI } from '../../../logic/interface/LabelI';
import { LABEL } from '../../../logic/ref/label';
import { CourseI } from '../../../logic/interface/CourseI';
import { Sorter } from '../../../logic/service/sorter';
import { Finder } from '../../../logic/service/finder';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  public courses$: Observable<CourseI[]>
  public label: LabelI;

  // Hämta aktuell kurslista baserat på det aktuella
  // sökordet och sorteringsflagga
  // Detta sker via RxJS
  constructor(
    sorter: Sorter,
    finder: Finder,
    courses: Courses) {
    this.courses$ = combineLatest([
      sorter.filter$,
      finder.search$,
      courses.cache$
    ]).pipe(this.table(
      sorter, finder));
    this.label = LABEL;
  }

  // Returnera tabellen baserat på sorterings- och sökord-värdet
  // samt de cachade kurserna
  private table = (
    sorter: Sorter,
    finder: Finder): any => {
    return map(([filter, 
      search, cache]) => {
      const sorted = 
        sorter.sorted(filter, 
          cache);
      return finder.found(
        search, sorted);
    });
  }
}


