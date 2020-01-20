import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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

  form: FormGroup;

  get fieldValue(): TextField {
    return this.form.getRawValue();
  }

  private onChange: (_: any) => void;
  private onTouched: () => void;
  private disabled: boolean;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.onChange = (_: any) => { };
    this.onTouched = () => { };
    this.disabled = false;
    this.form = this.formBuilder.group({
      name: new FormControl(null),
      description: new FormControl(null),
      required: new FormControl(null),
      textValue: new FormControl(null),
      observation: new FormControl(null)
    });
  }

  writeValue(value: TextField): void {
    if (!value) {
      return;
    }
    this.form.patchValue(value);
    const validators = [];
    if (value.required) {
      validators.push(Validators.required);
    }
    this.form.get('textValue').setValidators(validators);
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
    const changedValue = Object.assign(new TextField(), this.form.getRawValue());
    return changedValue;
  }

  emitSaveFieldEvent(): void {
    if (this.form.valid) {
      this.saveField.emit(this.factoryTextField());
    }
  }

  private changeValuesForm(): void {
    this.onChange(this.factoryTextField());
    this.onTouched();
  }

}
