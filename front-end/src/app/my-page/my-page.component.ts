import { Component, OnInit } from '@angular/core';

import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/map';
import { forEach } from '@angular/router/src/utils/collection';
@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {

private tData = null;
private error = null;
private res ;
  myForm: FormGroup;


  constructor(private fb: FormBuilder,private http: Http) { 
    this.myForm = fb.group({
    
      tID:new FormControl()
    

});
  }

  ngOnInit() {
  }

  getData(myForm){
    console.log(myForm.tID);
    this.res = this.getRemoteData(myForm.tID);
    if(this.error==null){
      this.tData = null;
      console.log(this.error);
    }
    else{
      this.error = null;
      console.log("else data"+this.tData);
    }
  }

  getRemoteData(id){
  
   return this.http.get("http://192.168.11.182:3000/api/org.acme.voting.vote/"+id).map(res => res.json())
    .subscribe(data => {
      this.tData = data;
      this.error=null;
      //console.log(JSON.stringify(data));
    },error => {
      this.error = error;
    });
  }

}
