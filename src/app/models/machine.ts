export class Machine {
    ip: string;
    name: string;
    comment: string;
    macadress: string;
    local : string;
    active : boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

