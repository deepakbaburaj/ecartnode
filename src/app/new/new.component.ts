import { Component, OnInit } from '@angular/core';
import {SampleService} from '../sample.service';
import { CalcService } from '../calc.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  msg;
  message;
  first:Number;
  second:Number;

  selectedFile: File = null;
  onFileSelect(event) {
        this.selectedFile = <File>event.target.files[0];
        console.log(event);
        console.log(this.selectedFile);
    }

  nProduct:string;
  nCompany:string;
  nPrice:string;
  uploadForm: FormGroup; 
  constructor(private ss:SampleService,private cs:CalcService,private http:HttpClient) { }

  ngOnInit() {

   
  }
addProduct(){
    var url = "http://localhost:8000/insert";
    const fd = new FormData();
    fd.append('imageFile', this.selectedFile, this.selectedFile.name);
    fd.append('name', this.nProduct);
    fd.append("company",this.nCompany);
    fd.append('price',this.nPrice);
    // var pr = {name:this.nProduct,
    // company:this.nCompany,
    // price:this.nPrice}
  

    // this.http.post(url, pr).subscribe(data=>{
    //   console.log(data);
    //   this.message = data;
    // })
    this.http.post(url,fd).subscribe(data=>{
      console.log(data);
    this.message = data;
     })
  }

}
