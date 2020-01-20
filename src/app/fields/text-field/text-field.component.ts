import { Component, forwardRef, Renderer2, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextField } from 'src/app/text-field.class';

const CUSTOM_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextFieldComponent),
  multi: true,
};

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class TextFieldComponent implements ControlValueAccessor {

  @Output() saveField = new EventEmitter<TextField>();
  @ViewChild('textValue', { static: true }) textValue: ElementRef;
  @ViewChild('observation', { static: true }) observation: ElementRef;

  fieldValue: TextField;

  private onChange: (_: any) => void;
  private onTouched: () => void;
  private disabled: boolean;

  constructor(
    private renderer: Renderer2
  ) {
    this.onChange = (_: any) => { };
    this.onTouched = () => { };
    this.disabled = false;
  }

  writeValue(value: TextField): void {
    if (!value) {
      return;
    }

    const tv = this.textValue.nativeElement;
    const ob = this.observation.nativeElement;

    this.fieldValue = value;
    this.renderer.setProperty(tv, 'textContent', value.textValue);
    this.renderer.setProperty(ob, 'textContent', value.observation);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private factoryTextField(): TextField {
    const changedValue = Object.assign(new TextField(), this.fieldValue);
    changedValue.textValue = this.textValue.nativeElement.value;
    changedValue.observation = this.observation.nativeElement.value;
    return changedValue;
  }

  emitSaveFieldEvent(): void {
    this.saveField.emit(this.factoryTextField());
  }

  private changeValuesForm(): void {
    this.onChange(this.factoryTextField());
    this.onTouched();
  }

}
