import { Component, OnInit,Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SESSION_STORAGE,WebStorageService} from 'angular-webstorage-service';
import {CalcService} from '../calc.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  cart;
  products;
  message;
  imagePath:string;
  qty:number=1;

  constructor(@Inject(SESSION_STORAGE) private storage:WebStorageService,private http:HttpClient,private serv:CalcService) { }

  ngOnInit() {
    var url="http://localhost:8000/data";
    this.imagePath="http://localhost:8000/img/";
    this.http.get(url).subscribe(data=>{
      console.log(data);
      this.products=data;
    
    // // this.http.get(this.imagePath).subscribe(data=>{
    // //   console.log(data);
    // //   this.message=data;
    // })
    this.cart=this.storage.get("cart");
    if(!this.cart)
    {
      this.cart=[];
    }
  })
}

  add(prd){

   console.log(prd);
   if(this.cart)
   {

   for(let i=0;i<this.cart.length;i++)
   {
     if(this.cart[i].company==prd.company)
     { this.qty=this.cart[i].qty+this.qty;
      this.cart.splice(i,1);
    }

   }
   }
   var obj ={name:prd.name,company:prd.company,price:prd.price,image:prd.image,qty:this.qty};
    this.cart.push(obj);
    this.storage.set("cart",this.cart);
    this.storage.set("qty",this.qty);
    this.serv.itemAddedToCart(this.cart.length);
  }

  decQuantity(){    
   this.qty=this.qty-1;
  }
  addQuantity(){    
    this.qty=this.qty+1;
  }



}
