import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import {BooksComponent} from "./components/books/books.component";
import { RecessionSearchComponent } from './recession-search/recession-search.component';
import { CommendsComponent } from './components/commends/commends.component';
import {BooktableComponent} from "./components/booktable/booktable.component";
import {BookLendingComponent} from "./components/bookLending/book-lending/book-lending.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate: [authGuard]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate: [authGuard]
  },
  {
    path:'users',
    component:UsersComponent,
    canActivate: [authGuard]
  },
  {
    path:'books',
    component:BooksComponent,
    canActivate: [authGuard]
  },
  {
    path:'recessions',
    component:RecessionSearchComponent,
    canActivate: [authGuard]
  },
  {
    path:'commends',
    component:CommendsComponent,
    canActivate: [authGuard]
  },
  {
    path:'booktable',
    component:BooktableComponent,
    canActivate: [authGuard]
  },
  {
    path:'bibliothek',
    component:BookLendingComponent,
    canActivate: [authGuard]
  },
  {
    path:'', redirectTo:'home',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
