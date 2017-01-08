import {Component,Input} from '@angular/core';

@Component({
    selector:'preloader',
    templateUrl:'preloader.component.html',
    styles:[`
    .preloader {
    position: relative;
    width: 30px;
    height: 30px;
    margin:0;
    -webkit-animation:spin 2.5s linear infinite;
    -moz-animation:spin 2.5s linear infinite;
    animation:spin 2.5s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
    `]
})
export class PreloaderComponent{
@Input() loaderMessage:string="טוען נתונים";
}