import { Component, OnInit, Inject } from '@angular/core';
import {SESSION_STORAGE,WebStorageService} from 'angular-webstorage-service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-delp',
  templateUrl: './delp.component.html',
  styleUrls: ['./delp.component.css']
})
export class DelpComponent implements OnInit {
  message;
  show:boolean=false;
  tname;
  tcompany;
  tprice;
  product;
  constructor(@Inject(SESSION_STORAGE) private storage:WebStorageService,private http:HttpClient) { }

  ngOnInit() {

    var url="http://localhost:8000/data";
    this.http.get(url).subscribe(data=>{
      console.log(data);
      this.product=data;
  })
}

  Delete(pname,i)
  {
    var data={name:pname};
    var url="http://localhost:8000/delete";

    this.http.post(url,data).subscribe(res=>{
      console.log(res);
      this.message=res;
      this.product.splice(i,1);
    })
  }
}
