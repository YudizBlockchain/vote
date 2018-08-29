import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { voterService } from './voter.service';
import 'rxjs/add/operator/toPromise';
import { ifVotedService } from '../ifVoted/ifVoted.service';
@Component({
	selector: 'app-voter',
	templateUrl: './voter.component.html',
	styleUrls: ['./voter.component.css'],
  providers: [voterService,ifVotedService]
})
export class voterComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
	private errorMessage;
  private asset;
  
      
          voterID = new FormControl("", Validators.required);
        
  
      
          fullName = new FormControl("", Validators.required);
        
  


  constructor(private servicevoter:voterService,private serviceifVoted:ifVotedService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          voterID:this.voterID,
        
    
        
          fullName:this.fullName
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicevoter.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
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
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    
    this.asset = {
      $class: "org.acme.voting.ifVoted",
      
        
          "voterID":this.voterID.value,
        
      
        
          "votedOrNot":false
        
      
    };

    this.serviceifVoted.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
    
    this.participant = {
      $class: "org.acme.voting.voter",
      
        
          "voterID":this.voterID.value,
        
      
        
          "fullName":this.fullName.value
        
      
    };

    this.myForm.setValue({
      
        
          "voterID":null,
        
      
        
          "fullName":null
        
      
    });

    return this.servicevoter.addParticipant(this.participant)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "voterID":null,
        
      
        
          "fullName":null 
        
      
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.acme.voting.voter",
      
        
          
        
    
        
          
            "fullName":this.fullName.value
          
        
    
    };

    return this.servicevoter.updateParticipant(form.get("voterID").value,this.participant)
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


  deleteParticipant(): Promise<any> {

    this.serviceifVoted.deleteAsset(this.currentId)
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

    return this.servicevoter.deleteParticipant(this.currentId)
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

    return this.servicevoter.getparticipant(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "voterID":null,
          
        
          
            "fullName":null 
          
        
      };



      
        if(result.voterID){
          
            formObject.voterID = result.voterID;
          
        }else{
          formObject.voterID = null;
        }
      
        if(result.fullName){
          
            formObject.fullName = result.fullName;
          
        }else{
          formObject.fullName = null;
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
      
        
          "voterID":null,
        
      
        
          "fullName":null 
        
      
      });
  }

}
