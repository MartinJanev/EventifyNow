import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'  
    },
    {
        path:'mk',
        component: HomeComponent,
        title: 'Почетна Страна'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title:'Details Page'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Sign In Page'
    },
    {
        path:'register',
        component: RegisterComponent,
        title: 'Register Page'
    }
];

export default routeConfig;