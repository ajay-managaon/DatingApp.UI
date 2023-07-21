import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './services/account.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './modules/shared.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './errorpages/not-found/not-found.component';
import { ServerErrorComponent } from './errorpages/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TextComponentComponent } from './_forms/text-component/text-component.component';
import { DateInputComponent } from './_date/date-input/date-input.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailsComponent,
    ListsComponent,
    MessagesComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextComponentComponent,
    DateInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    FileUploadModule,
    ReactiveFormsModule
  ],
  providers: [
    AccountService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : ErrorInterceptor,
      multi : true
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : JwtInterceptor,
      multi : true
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : LoadingInterceptor,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
