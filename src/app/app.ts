import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Courses } from './logic/service/courses';
import { FilterForm } from './ui/component/filter/filter-form';
import { Table } from './ui/component/table/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FilterForm, Table],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tslab4');
  private courses: Courses;
  private subs: Subscription;

  constructor(courses: Courses) {
    this.courses = courses;
    this.subs = new Subscription();
  }

  // Börja observera uppdateringar av
  // data-flödet från HttpClient
  public ngOnInit() {
    this.subs.add(
      this.courses
        .fromNetwork());
  }

  // Sluta observera data-flödet från
  // HttpClient så att det inte fortsätter
  // köra i bakgrunden
  public ngOnDestroy(){
    this.subs.unsubscribe();
  }
}
