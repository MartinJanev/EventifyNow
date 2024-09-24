import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";


const routeConfig: Routes = [
    {
        path: '',
        component: DashboardComponent,
        title: 'Landing Page',
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home page'
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
    },
    {
        path:'forgot-password',
        component: ForgotPasswordComponent,
        title: 'Forgot Password Page'
    },
    {
        path:'verify-email',
        component: VerifyEmailComponent,
        title: 'Verify Your Email'
    }
    
];

export default routeConfig;