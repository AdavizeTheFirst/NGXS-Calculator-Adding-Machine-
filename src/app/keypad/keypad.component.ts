import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as CalculatorActions from '../actions/calculator.actions'

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss']
})
export class KeypadComponent implements OnInit {
  valuesRange = [1,2,3,4,5,6,7,8,9,0];
  constructor(private store: Store) { }

  operationInput(target: EventTarget | null){
    const elem = target as HTMLButtonElement
    if(elem == null || elem.className != "operation-btn") {return}
    const operationName = elem.getAttribute("data-operation-name")
    if(operationName == null) { return }
    this.store.dispatch(new CalculatorActions.InputOperation(operationName))
  }

  valueInput(target: EventTarget | null) {
    const elem = target as HTMLButtonElement
    if(elem == null || elem.className != "value") {return}


    const value = elem.getAttribute("data-value")
    if (value == null) { return }

    if (value == "reset") {
      this.store.dispatch(new CalculatorActions.Reset())
      return
    }

    if (value == "clear"){
      this.store.dispatch(new CalculatorActions.Backspace())
      return
    }

    this.store.dispatch(new CalculatorActions.InputValue(value))
  }

  calculate(){
    this.store.dispatch(new CalculatorActions.Calculate())
  }
  ngOnInit(): void {

  }

}
