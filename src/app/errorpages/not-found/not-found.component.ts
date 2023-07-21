import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  serverError(){
    const navigationExtras : NavigationExtras = {
      state : {
        error : "There is an error on this page"
      }
    }
    this.router.navigateByUrl('server-error', navigationExtras);
  }
}
