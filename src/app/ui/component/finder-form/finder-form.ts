import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Finder } from '../../../logic/service/finder';

@Component({
  selector: 'app-finder-form',
  imports: [ReactiveFormsModule],
  templateUrl: './finder-form.html',
  styleUrl: './finder-form.css',
})
export class FinderForm {
  public form: FormGroup;
  private subs: Subscription;
  private finder: Finder;

  constructor(
    fBuilder: FormBuilder,
    finder: Finder) {
    this.form = fBuilder.group({
      search: ['']
    });
    this.subs = new Subscription();
    this.finder = finder;
  }

  public ngOnInit() {
    this.subs.add(
      this.search());
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private search = (
    ): Subscription => {
    return this.form.get('search')!
      .valueChanges
      .subscribe(value => {
        this.finder
          .updSearch(value);
      });
  }
}
