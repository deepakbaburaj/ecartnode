import { Component, OnInit,Inject } from '@angular/core';
import {SESSION_STORAGE,WebStorageService} from 'angular-webstorage-service';
import {CalcService} from '../calc.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  show:boolean=false;
  show1:boolean=false;
  show2:boolean=false;
  val;
  cartCount;
  constructor(@Inject(SESSION_STORAGE) private storage:WebStorageService,private serv:CalcService) { }

  ngOnInit() {
    this.val=this.storage.get("user");
    if(this.val=="sadasdadas@gmail.com")
    { 
      console.log("enterd");
      this.show=true;
      this.show2=true;
    }
    else 
    {
      this.show1=true;
      this.show2=true;
    }
    this.serv.count.subscribe(data=>{
      this.cartCount = data;
      console.log(this.cartCount);
  })
  }
  logout()
  {
    this.storage.remove("user");
    this.storage.remove("cart");
  }

}
