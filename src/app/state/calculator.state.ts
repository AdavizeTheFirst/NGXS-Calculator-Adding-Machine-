import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import * as CalculatorActions from "../actions/calculator.actions"
import { CalculatorStateModel, OperationName, operationsList, operationsSymbolMap } from '../models/calculator.model';

@State<CalculatorStateModel>({
    name: "calculator",
    defaults: {
        operations: "",
        result: "",
        history: [],
    }
})

@Injectable()

export class CalculatorState {
    @Action(CalculatorActions.InputOperation)
    inputOperation(ctx: StateContext<CalculatorStateModel>, { payload }: CalculatorActions.InputOperation) {
        const state = ctx.getState()
        let op = payload as OperationName

        if (state.operations == "") { 

            if (state.result != "0" && Boolean(Number(state.result))){
                ctx.setState({
                    ...state,
                    operations: `${state.result} ${operationsSymbolMap[op]}`,
                    result: ""
                })
                return
            }
            return // this is lazy yes ik
        } 

        let slicedOperations = state.operations.split(" ")

        let lastEntry = slicedOperations[slicedOperations.length-1]
        
        //replace operation if last entry was an operation
        if (operationsList.includes(lastEntry)){
            slicedOperations[slicedOperations.length-1] = operationsSymbolMap[op]
        }
        else {
            slicedOperations.push(operationsSymbolMap[op])
        }

        ctx.setState({
            ...state,
            operations: slicedOperations.join(" ")
        })
    }

    @Action(CalculatorActions.InputValue)
    inputValue (ctx: StateContext<CalculatorStateModel>, {payload}: CalculatorActions.InputValue){
        const state = ctx.getState()
        
        if ((payload == "0") && state.operations == "") {
            return
        }
        
        let slicedOperations = state.operations.split(" ")
        let lastEntry = slicedOperations[slicedOperations.length-1]

        //push new value is last entry was an operation
        if (operationsList.includes(lastEntry)){
            if (payload == "0") { return }
            slicedOperations.push(payload)
        }
        else {
            slicedOperations[slicedOperations.length-1] = lastEntry.concat(payload)
        }

        ctx.setState({
            ...state,
            operations: slicedOperations.join(" ")
        })
    }

    @Action(CalculatorActions.Backspace)
    backspace(ctx: StateContext<CalculatorStateModel>){
        const state = ctx.getState()
        
        console.log("hi")
        let slicedOperations = state.operations.split(" ")

        let lastEntry = slicedOperations[slicedOperations.length-1]
        
        if(operationsList.includes(lastEntry) || lastEntry.length == 1){
            slicedOperations.pop()
        } else {
            slicedOperations[slicedOperations.length-1] = lastEntry.substring(0, lastEntry.length - 1);
        }

        ctx.setState({
            ...state,
            operations: slicedOperations.join(" ")
        })
    }

    @Action(CalculatorActions.Reset)
    reset(ctx: StateContext<CalculatorStateModel>){
        
        ctx.patchState({
            operations: "",
            result: ""
        })
    }

    @Action(CalculatorActions.Calculate)
    calculate(ctx: StateContext<CalculatorStateModel>){
       const state = ctx.getState()


        if(state.operations != "" && !operationsList.includes(state.operations[state.operations.length-1])){

            let evaluated = eval(state.operations)
            ctx.patchState({
                result: evaluated,
                operations: "",
                history: [...state.history, {
                    operations: state.operations,
                    result: evaluated
                }]
            })
        }
    }

    @Action(CalculatorActions.SetHistory)
    setHistory({getState, patchState}: StateContext<CalculatorStateModel>, {payload}: CalculatorActions.SetHistory){
        const state = getState()
        console.log({payload})
        console.log(
            state.history[payload].operations
        )
        patchState({
            operations: state.history[payload].operations,
            result: state.history[payload].result
        })
    }
}