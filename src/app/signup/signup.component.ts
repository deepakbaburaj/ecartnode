import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }
  tname:String;
  temail:String;
  tpass:String;
  ngOnInit() {
    
   
  }

  AddUser()
  {
    var url = "http://localhost:8000/adduser";
    var pr = {name:this.tname,
    email:this.temail,
    password:this.tpass};
    this.http.post(url,pr).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl("/login");
  })
}
}
