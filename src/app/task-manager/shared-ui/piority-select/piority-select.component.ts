import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {IPiorites} from "../../models/task-model";

@Component({
  selector: 'app-piority-select',
  templateUrl: './piority-select.component.html',
  styleUrls: ['./piority-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PioritySelectComponent),
    multi: true
  }]
})
export class PioritySelectComponent implements ControlValueAccessor {
  onChange!: (_: any) => void;
  onTouch!: () => void;

  @Input('list') piorityList: IPiorites[] = [];
  selected = '';

  selectPiority(item: IPiorites) {
    this.selected = item.value;
    this.onTouch();
    this.onChange(item.value);
    console.log(item.value);
  }

  writeValue(value: any) {
    this.selected = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }
}
