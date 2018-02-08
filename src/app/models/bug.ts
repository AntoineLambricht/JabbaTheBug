export class Bug {
    machinename: string;
    mailuser: string;
    descrip: string;
    datehour: string;
    photo: string;
    statusinfo: boolean;

    constructor(values: Object= {}){
        Object.assign(this, values);
    }
}