import { Component, OnInit,Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SESSION_STORAGE,WebStorageService} from 'angular-webstorage-service';
import {CalcService} from '../calc.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart=[];
  qty;
  imagePath:string;
  total:number=0;
  gtot:number;

  constructor(@Inject(SESSION_STORAGE) private storage:WebStorageService,private http:HttpClient,private serv:CalcService) { }
  ngOnInit() {

    this.imagePath="http://localhost:8000/img/";
    this.cart=this.storage.get("cart");
    console.log(this.cart);
    for(let i=0;i<this.cart.length;i++)
    {
      this.total=this.total+this.cart[i].price*this.cart[i].qty;
    }
    this.gtot=this.total+50;
    
  }

  remove(i){
    this.total=this.total-(this.cart[i].qty*this.cart[i].price);
    this.cart.splice(i,1);
    this.storage.set("cart",this.cart);
    this.serv.itemAddedToCart(this.cart.length);
  }
    
  rem()
  {
    this.storage.remove("cart");
    this.serv.itemAddedToCart(this.cart.length);
}
}