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

  // Initiera formuläret och data
  constructor(
    fBuilder: FormBuilder,
    finder: Finder) {
    this.form = fBuilder.group({
      search: ['']
    });
    this.subs = new Subscription();
    this.finder = finder;
  }

  // Börja lyssna efter uppdateringar av sökfältet
  public ngOnInit() {
    this.subs.add(
      this.search());
  }

  // Sluta lyssna efter uppdateringar av sökfältet
  // för att undvika minnesläckor
  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // Lyssna efter uppdateringar av sökfältet
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
