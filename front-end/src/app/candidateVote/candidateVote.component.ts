import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { candidateVoteService } from './candidateVote.service';

import {ipService} from '../ipService/ipService.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-candidateVote',
	templateUrl: './candidateVote.component.html',
	styleUrls: ['./candidateVote.component.css'],
  providers: [candidateVoteService,ipService]
})
export class candidateVoteComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      
          politicalParty = new FormControl("", Validators.required);
        
  
      
          totalVote = new FormControl("", Validators.required);
        
  


  constructor(private myIpService:ipService,private servicecandidateVote:candidateVoteService, fb: FormBuilder) {
    
    this.myIpService.getIpAddress().subscribe(data => {
      console.log(data);
    });

    this.myForm = fb.group({
    
     
        
          politicalParty:this.politicalParty,
        
    
        
          totalVote:this.totalVote
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicecandidateVote.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.voting.candidateVote",
      
        
          "politicalParty":this.politicalParty.value,
        
      
        
          "totalVote":this.totalVote.value
        
      
    };

    this.myForm.setValue({
      
        
          "politicalParty":null,
        
      
        
          "totalVote":null
        
      
    });

    return this.servicecandidateVote.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "politicalParty":null,
        
      
        
          "totalVote":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.voting.candidateVote",
      
        
          
        
    
        
          
            "totalVote":this.totalVote.value
          
        
    
    };

    return this.servicecandidateVote.updateAsset(form.get("politicalParty").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicecandidateVote.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.servicecandidateVote.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "politicalParty":null,
          
        
          
            "totalVote":null 
          
        
      };



      
        if(result.politicalParty){
          
            formObject.politicalParty = result.politicalParty;
          
        }else{
          formObject.politicalParty = null;
        }
      
        if(result.totalVote){
          
            formObject.totalVote = result.totalVote;
          
        }else{
          formObject.totalVote = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "politicalParty":null,
        
      
        
          "totalVote":null 
        
      
      });
  }

}
