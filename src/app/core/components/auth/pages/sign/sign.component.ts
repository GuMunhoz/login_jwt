import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  msgError: string | undefined;
   public formAuth: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
   });
  constructor(private _fb : FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
  }

  submitForm() {
    if(this.formAuth.valid) {
     this.authService.sign({
      email: this.formAuth.value.email,
      password: this.formAuth.value.password
     }).subscribe({
      next:(res) => res,
      error: (e) => this.msgError = e
     })
    }
  }
}
