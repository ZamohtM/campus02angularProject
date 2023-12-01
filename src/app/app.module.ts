import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { DataTablesModule } from "angular-datatables";
import { RecessionSearchComponent } from './recession-search/recession-search.component';
import { BooksComponent } from './components/books/books.component';
import { BooktableComponent } from "./components/booktable/booktable.component";
import { BookLendingComponent } from "./components/bookLending/book-lending/book-lending.component";
import { CommendsComponent } from './components/commends/commends.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { CommendCardComponent } from './components/commend-card/commend-card.component';
import { CommendListComponent } from './components/commend-list/commend-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {IgxComboModule, IgxSimpleComboComponent} from 'igniteui-angular';
import { BookLendingComboComponent } from './components/bookLending/book-lending-combo/book-lending-combo.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'commends', component: CommendsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    UsersComponent,
    BooksComponent,
    BooktableComponent,
    BookLendingComponent,
    RecessionSearchComponent,
    CommendsComponent,
    CommendCardComponent,
    CommendListComponent,
    BookLendingComboComponent,
    BookLendingComboComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    FormsModule,
    BrowserAnimationsModule,
    IgxComboModule,
    IgxSimpleComboComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
