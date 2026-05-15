import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FILTER } from '../../../logic/ref/filter';
import { Subscription } from 'rxjs';
import { FilterI } from '../../../logic/interface/FilterI';
import { CommonModule } from '@angular/common';
import { Courses } from '../../../logic/service/courses';
import { LabelI } from '../../../logic/interface/LabelI';
import { LABEL } from '../../../logic/ref/label';
import { Sorter } from '../../../logic/service/sorter';

@Component({
  selector: 'app-filter-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filter-form.html',
  styleUrl: './filter-form.css',
})
export class FilterForm {
  public form: FormGroup;
  private subs: Subscription;
  public filtMode: FilterI;
  public label: LabelI;
  private sorter: Sorter;

  constructor(
    fBuilder: FormBuilder,
    courses: Courses,
    sorter: Sorter) {
    this.form = fBuilder.group({
      filter: [FILTER.ORG]
    });
    this.filtMode = FILTER;
    this.label = LABEL;
    this.subs = 
      new Subscription();
    this.sorter = sorter;
  }

  public ngOnInit() {
    this.subs.add(
      this.filter());
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private filter = (
    ): Subscription => {
    return this.form.get('filter')!
      .valueChanges.subscribe(
        value => {
        this.sorter
          .sort(value);
      });
  }
}
