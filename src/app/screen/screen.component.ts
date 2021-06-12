import { Store, Select } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {


  operations$: Observable<string>
  result$: Observable<string>

  constructor(private store: Store) {
    this.operations$ = this.store.select(state => state.calculator.operations)
    this.result$ = this.store.select(state => state.calculator.result)
  }

  ngOnInit(): void {
  }

}
