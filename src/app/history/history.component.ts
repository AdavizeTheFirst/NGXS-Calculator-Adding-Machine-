import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { CalculatorStateModel } from "../models/calculator.model";
import * as CalculatorActions from "../actions/calculator.actions"

@Component({
    selector: "app-history",
    template: `
        <div class="history">
        <button class="history-btn" (click)="toggleOpen()">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
    <!-- Uploaded to SVGRepo https://www.svgrepo.com -->
    <title>ic_fluent_history_24_filled</title>
    <desc>Created with Sketch.</desc>
    <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="ic_fluent_history_24_filled" fill="#212121" fill-rule="nonzero">
            <path d="M12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C10.2906397,21 8.64934582,20.5216903 7.23062266,19.6336282 C6.652798,19.2719338 6.11762369,18.845602 5.63566519,18.3635872 C5.15297254,17.8808382 4.72614095,17.3447197 4.36416292,16.7658467 C3.47750386,15.3479072 3,13.7079229 3,12 C3,11.7259752 3.01227563,11.4533053 3.03668633,11.1825607 C3.08627989,10.6325071 3.57238994,10.2268041 4.1224435,10.2763977 C4.67249706,10.3259912 5.07820005,10.8121013 5.02860649,11.3621549 C5.00957779,11.5732065 5,11.7859512 5,12 C5,13.3301778 5.37065893,14.6032038 6.05991929,15.7054646 C6.34163835,16.1559879 6.6740111,16.5734621 7.04996135,16.9494563 C7.42534016,17.3248789 7.84207996,17.6568631 8.29178905,17.9383625 C9.39466252,18.6287158 10.6687045,19 12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C10.1286447,5 8.38425005,5.73939998 7.09794405,7.00203852 L8.4977105,7.00341461 C9.04999525,7.00341461 9.4977105,7.45112986 9.4977105,8.00341461 C9.4977105,8.51625045 9.11167031,8.93892177 8.61433163,8.99668688 L8.4977105,9.00341461 L4.4963095,9.00341461 C3.98347366,9.00341461 3.56080234,8.61737442 3.50303724,8.12003574 L3.4963095,8.00341461 L3.4963095,4.00351123 C3.4963095,3.45122648 3.94402475,3.00351123 4.4963095,3.00351123 C5.00914534,3.00351123 5.43181666,3.38955142 5.48958177,3.88689011 L5.4963095,4.00351123 L5.49588685,5.77845613 C7.16609908,4.03157881 9.49557109,3 12,3 Z M11.25,7 C11.6295,7 11.9434583,7.28233333 11.9931493,7.64827431 L12,7.75 L12,12 L14.25,12 C14.664,12 15,12.336 15,12.75 C15,13.1295 14.7176667,13.4434583 14.3517257,13.4931493 L14.25,13.5 L11.25,13.5 C10.8705,13.5 10.5565417,13.2176667 10.5068507,12.8517257 L10.5,12.75 L10.5,7.75 C10.5,7.336 10.836,7 11.25,7 Z" id="🎨-Color"/>
        </g>
    </g>
</svg>
        </button>

        <ul class="history-list" *ngIf="isOpen">
            <span *ngIf="(history$ | async)?.length == 0">No History to display</span>
            <ng-container *ngFor="let h of history$ | async; let i = index">
            <li [attr.data-index]="i" (click)="setHistory($event.currentTarget)">
                <span>{{ h.operations }}</span>
                =
                <span>{{ h.result }}</span>
            </li>
            </ng-container>
        </ul>
        </div>
    `
})

export class HistoryComponent {
    history$: Observable<CalculatorStateModel[]>
    isOpen: boolean = false;

    toggleOpen () {
        this.isOpen = !this.isOpen
    }
    setHistory(e: EventTarget | null){
        if (e == null) { return }
        let elem = e as HTMLButtonElement

        const stateIndex = elem.getAttribute("data-index")

        if (stateIndex == null) { return }

        this.store.dispatch(new CalculatorActions.SetHistory(Number(stateIndex)))
        this.toggleOpen()
    }

    constructor(private store: Store) {
        this.history$ = this.store.select(state => state.calculator.history)
    }
}
