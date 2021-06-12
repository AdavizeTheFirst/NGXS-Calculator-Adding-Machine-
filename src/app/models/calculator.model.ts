
// export interface

export const operationsList = ["+", "-", "/", "*"]

export const operationsSymbolMap = {
    add: "+",
    subtract: "-",
    divide: "/",
    multiply: "*"
}

export enum OperationName {
    add = "add",
    subtract = "subtract",
    multiply = "multiply",
    divide = "divide"
}

export interface CalculatorHistory {
    operations: string,
    result: string;
}

export interface CalculatorStateModel {
    operations: string;
    result: string;
    history: CalculatorHistory[];
}