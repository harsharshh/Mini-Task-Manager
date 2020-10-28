import {Injectable} from '@angular/core';
import {NbGlobalPhysicalPosition, NbToast, NbToastrConfig, NbToastrService} from '@nebular/theme';

@Injectable({providedIn: 'root'})
export class AlertService {

    constructor(private nbToastrService: NbToastrService) {
    }

    /**
     *  Show success alert. If no title is provided as argument, the default title is
     *  'Success'
     */
    showSuccessAlert(message, title = 'Success') {
        this.nbToastrService.show(message, title, this.getAlertConfig('success'));
    }

    /**
     *  Show info alert. If no title is provided as argument, the default title is
     *  'Info'
     */
    showInfoAlert(message, title = 'Info') {
        this.nbToastrService.show(message, title, this.getAlertConfig('info'));
    }

    /**
     *  Show warning alert. If no title is provided as argument, the default title is
     *  'Warning'
     */
    showWarningAlert(message, title = 'Warning') {
        this.nbToastrService.show(message, title, this.getAlertConfig('warning'));
    }

    /**
     *  Show success alert. If no title is provided as argument, the default title is
     *  'Error'
     */
    showErrorAlert(message: string, title = 'Error') {
        this.nbToastrService.show(message, title, this.getAlertConfig('danger'));
    }

    private getAlertConfig(status) {
        return {
            status: status,
            duration: 5000,
            position: NbGlobalPhysicalPosition.TOP_RIGHT
        };
    }
}
