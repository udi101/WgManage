import { Component } from '@angular/core';
import { IProcess } from './../../interfaces/process.interface'

@Component({
    templateUrl: 'spContainer.component.html'
})
export class SpContainerComponent {
    currentProcess: IProcess = <IProcess>{};

    setCurrentProcess(_process: IProcess) {
        console.log("the current Process (from spContainer..) is: " + _process.processName);
        this.currentProcess = _process;
    }
}