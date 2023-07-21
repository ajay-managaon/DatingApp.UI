import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { delay, finalize, Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService : SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busyService.busy();
    return next.handle(request).pipe(
      delay(500),
      finalize(()=>{
        this.busyService.idle();
      })
    )
  }
}
