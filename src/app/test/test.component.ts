import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  product;
  message;
  show:boolean=false;
  tname;
  tcompany;
  tprice;
  constructor( private http:HttpClient,private router:Router) {}

  ngOnInit() {
    var url="http://localhost:8000/data";
    this.http.get(url).subscribe(data=>{
      console.log(data);
      this.product=data;
    })
  }
  connect()
  {
  
  }
  // Delete(pname,i)
  // {
  //   var data={name:pname};
  //   var url="http://localhost:8000/delete";
  //   this.http.post(url,data).subscribe(res=>{
  //     console.log(res);
  //     this.message=res;
  //     this.product.splice(i,1);
  //   })
  // }
  Edit(pr)
  {
    this.show=true;
    this.tname=pr.name;
    this.tcompany=pr.company;
    this.tprice=pr.price;
   
      
    }

  Update()
  { 
    this.show=false;
    var data={name:this.tname,company:this.tcompany,price:this.tprice};
    var url="http://localhost:8000/update";
    this.http.post(url,data).subscribe(res=>{
    console.log(res);
    this.message=res;
      this.router.navigateByUrl("/server");
  })
  } 

}