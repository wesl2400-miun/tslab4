import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Courses } from './logic/service/courses';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tslab4');

  // Temporär kod, testar logiken
  constructor(courses: Courses) {
    courses.fromNetwork();
  }
}
