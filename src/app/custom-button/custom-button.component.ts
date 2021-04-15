import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MyButtonConfig} from '../button-config';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  @Input() btnType: MyButtonConfig;
  @Input() route: string;

  @Output() outPut = new EventEmitter<any>();

  constructor() { }

  btnClicked(): void {
    this.outPut.emit(this.route);
  }

  ngOnInit(): void { }

  }
