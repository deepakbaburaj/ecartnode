import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {StorageServiceModule} from 'angular-webstorage-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewComponent } from './new/new.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { DelpComponent } from './delp/delp.component';
import {SampleService} from './sample.service';
import {CalcService} from './calc.service';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MainpageComponent } from './mainpage/mainpage.component';

const routes:Routes=[{path:"",component:LoginComponent},
                     {path:"login",component:LoginComponent},
                     {path:"register",component:SignupComponent},
                     {path:"home",component:MainpageComponent,
                     children:[
                     {path:"",component:HomeComponent},
                     {path:"new",component:NewComponent},
                     {path:"edit",component:EditComponent},
                     {path:"del",component:DelpComponent},
                     {path:"view",component:ViewComponent},
                     {path:"cart",component:CartComponent},
                     {path:"checkout",component:CheckoutComponent}
                    ]
                     }
                    ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewComponent,
    ViewComponent,
    EditComponent,
    DelpComponent,
    TestComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CartComponent,
    FooterComponent,
    CheckoutComponent,
    MainpageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StorageServiceModule
  ],
  providers: [SampleService,CalcService],
  bootstrap: [AppComponent]
})
export class AppModule { }
