export class Calculate {
    static readonly type = '[Calculator] Calculate'
}

export class InputValue {
    static readonly type = '[Calculator] Add Value' 

    constructor(public payload: string){}
}

export class InputOperation {
    static readonly type = '[Calculator] Add Operation'

    constructor(public payload: string){}
}

export class Backspace {
    static readonly type = '[Calculator] Backspace'
}

export class Reset {
    static readonly type = '[Calculator] Reset'
}

export class SetHistory {
    static readonly type = '[Calculator] Set History'

    constructor(public payload: number){}
}