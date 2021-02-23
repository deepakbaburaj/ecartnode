import { Component, OnInit, Inject } from '@angular/core';
import {SESSION_STORAGE,WebStorageService} from 'angular-webstorage-service';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  temail:String;
  tpass:String;
  message;
  constructor(@Inject(SESSION_STORAGE) private storage:WebStorageService,private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }
  Setuser()
{
  this.storage.set("user",this.temail);
  console.log(this.temail+"logged in");
  var url = "http://localhost:8000/logincheck";
    var pr = {email:this.temail,
    password:this.tpass};
    this.http.post(url,pr).subscribe(data=>{
      console.log(data);
      this.message=data;
if(this.message.msg=="Success")
      {
        this.router.navigateByUrl("/home");
      }
      else
      this.router.navigateByUrl("/login");
});
}
}