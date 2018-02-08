import { IMachine }     from '../machine/IMachine';
import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';

export interface IBug {
    _id: string;
    machinename: string;
    mailuser: string;
    descrip: string;
    datehour: string;
    photo: string;
    photoSafe: SafeUrl;
    statusinfo: boolean;
    showDetails: boolean;
    machine: IMachine;
}