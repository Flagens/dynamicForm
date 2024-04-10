import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface FormData {
  [key: string]: { type: string, options?: string[], value?: any };
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent {
  formData: FormData = {
    "ala": { "type": "text" },
    "ma": { "type": "number" },
    "kota": { "type": "select", "options": ["a", "b", "c"] }
  };

  form!: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.createForm();
  }

  createForm() {
    const formControls: { [key: string]: FormControl } = {};

    for (const field in this.formData) {
      const fieldData = this.formData[field];
      formControls[field] = new FormControl(null);
    }

    this.form = this.fb.group(formControls);
  }

  objectKeys(obj: Object) {
    return Object.keys(obj);
  }

  onSubmit() {
    const formValue = this.form.value;
    const result: FormData = {};

    for (const field in formValue) {
      result[field] = {
        type: this.formData[field].type,
        value: formValue[field]
      };

      if (this.formData[field].options) {
        result[field].options = this.formData[field].options;
      }
    }
    this.http.post('https://example.api.com', result)
      .subscribe(
        response => console.log('Odpowiedź:', response),
        error => console.error('Błąd:', error)
      );
  }
}