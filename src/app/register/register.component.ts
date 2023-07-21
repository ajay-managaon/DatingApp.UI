import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm!: FormGroup;
  maxDate : Date
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private router: Router,
    private fb : FormBuilder
  ) {}

  ngOnInit(): void {
    this.inititlizeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  inititlizeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]],
      knownAs: ['', [
        Validators.required,
        Validators.minLength(4),
      ]],
      dateOfBirth: ['', [
        Validators.required
      ]],
      city: ['', [
        Validators.required,
      ]],
      country: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ]],
      confirmpassword: ['', [
        Validators.required,
        this.matchPassword('password'),
      ]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmpassword'].updateValueAndValidity();
    });
  }

  register() {
      this.accountService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');
        }, 
        error: error =>{
          this.validationErrors = error
        }
      });
  }

  matchPassword(password: string): ValidatorFn {
    return (confirmCasswordControl: AbstractControl) => {
      const passwordControl = confirmCasswordControl?.parent?.controls as {
        [key: string]: AbstractControl;
      };
      return passwordControl &&
        confirmCasswordControl?.value === passwordControl[password]?.value
        ? null
        : { isMatching: true };
    };
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
