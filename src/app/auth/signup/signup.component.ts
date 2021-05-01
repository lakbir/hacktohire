import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  submitted: boolean;
  registerFormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.maxLength(15),Validators.minLength(5)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.maxLength(25), Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.maxLength(25), Validators.minLength(6)])
  }, {validators: this.checkPasswords});
  constructor() { }

  ngOnInit(): void {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }

  onRegister() {

  }
}
