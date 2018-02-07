export class Machine {
    private _qrcode: string;

    constructor(private _id: string,
        private _ip: string,
        private _name: string,
        private _comment: string,
        private _macadress,
        private _local,
        private _active) {
    }

    getId(): string {
        return this._id;
    }

    getIp(): string {
        return this._ip;
    }

    getName(): string {
        return this._name;
    }

    getComment(): string{
        return this._comment;
    }

    getMacadress(): string{
        return this._macadress;
    }

    getLocal(): string {
        return this._local;
    }

    getActive(): boolean{
        return this._active;
    }

    getQrcode(): string{
        return this._qrcode;
    }

    setQrcode(qr: string){
        this._qrcode = qr;
    }

}

