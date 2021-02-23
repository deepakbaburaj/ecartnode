import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product;
  message;
  show:boolean=false;
  tname;
  tcompany;
  tprice;
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(
  ) {
    var url="http://localhost:8000/data";
    this.http.get(url).subscribe(data=>{
      console.log(data);
      this.product=data;
    })
  }

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
      this.router.navigateByUrl("/edit");
  })
  } 

}
