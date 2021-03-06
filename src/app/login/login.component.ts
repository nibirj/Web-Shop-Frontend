import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.formBuilder.group({
      username: '',
      password: ''
    });

    if (this.authenticationService.CurrentUserValue) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(userPassword) {
    this.authenticationService.login(userPassword)
      .pipe(first())
      .subscribe(
        (user) => {
          this.router.navigate([this.returnUrl]).then(r => location.href = '/dashboard');
        },
        error => {
          console.log(error);
        });

  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.registerForm.reset();
  }

}
