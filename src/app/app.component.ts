import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TextField } from './text-field.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'custom-reactive-form';
  form: FormGroup;
  mock: TextField;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      textField: new FormControl(null)
    });
  }

  showForm(): void {
    console.log('Mock data: ');
    console.log(this.mock);
    console.log('Form data: ');
    console.log(this.form.getRawValue());
  }

  insertForm(): void {
    this.mock = Object.assign(new TextField(), {
      name: 'Nome do convidado',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      required: false,
      textValue: 'Vanderley Sousa',
      observation: 'Good guy'
    });
    this.form.patchValue({ textField: this.mock });
    console.log('✔ Mock inserted');
  }

  saveField(dataEvent: TextField): void {
    console.log('✔ Event emitted');
    console.log(dataEvent);
  }
}
