import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { voteService } from './vote.service';
import { voterService } from '../voter/voter.service';
import { candidateVoteService } from '../candidateVote/candidateVote.service';
import { ifVotedService } from '../ifVoted/ifVoted.service';

import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-vote',
	templateUrl: './vote.component.html',
	styleUrls: ['./vote.component.css'],
  providers: [voteService,voterService,candidateVoteService,ifVotedService]
  
})
export class voteComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  private allParticipants;

  private allParties;
  private allVoterVotes;

  private canVote = true;
      
          candidateVoteAsset = new FormControl("", Validators.required);
        
  
      
          ifVotedAsset = new FormControl("", Validators.required);
        
  
      
        
  


  constructor(private serviceifVoted:ifVotedService,private servicecandidateVote:candidateVoteService,private servicevoter:voterService, private servicevote:voteService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          candidateVoteAsset:this.candidateVoteAsset,
        
    
        
          ifVotedAsset:this.ifVotedAsset,
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
    this.loadAll2();
    this.loadAll3();
    this.loadAll4();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicevote.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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

///////////////////////////////////////////////////

loadAll2(): Promise<any> {
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


////////////////////////////////////////////////

loadAll3(): Promise<any> {
  let tempList = [];
  return this.servicecandidateVote.getAll()
  .toPromise()
  .then((result) => {
    this.errorMessage = null;
    result.forEach(asset => {
      tempList.push(asset);
    });
    this.allParties = tempList;
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

//////////////////////////////////////////////////////////////////

loadAll4(): Promise<any> {
  let tempList = [];
  return this.serviceifVoted.getAll()
  .toPromise()
  .then((result) => {
    this.errorMessage = null;
    result.forEach(asset => {
      tempList.push(asset);
    });
    this.allVoterVotes = tempList;
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


///////////////////////////////////////////////////////////////////////

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
   
console.log( this.allVoterVotes.length);

for (let num of this.allVoterVotes) {

  console.log(num.voterID + " voted:"+num.votedOrNot);

  console.log("stoppppppppp:"+this.ifVotedAsset.value);

  if(this.canVote)
  {
    if(this.ifVotedAsset.value == num.voterID && num.votedOrNot == true)
    {
    
      this.canVote = false;

      location.reload();
    //this.i = false; //////////////// for break loop <----------------
    }
  } 
}


   if(this.canVote == false)
   {
      alert('already voted !!!!!!!!!!!!!!');
   }
   else{

   console.log("can vote:"+this.canVote);

    this.Transaction = {

      $class: "org.acme.voting.vote",
      
        
          "candidateVoteAsset":this.candidateVoteAsset.value,
        
      
        
          "ifVotedAsset":this.ifVotedAsset.value
        
      
        
      
    };

    this.myForm.setValue({
      
        
          "candidateVoteAsset":null,
        
      
        
          "ifVotedAsset":null
        
      
    });

    return this.servicevote.addTransaction(this.Transaction)
    .toPromise()
    .then((result) => {
console.log(result.transactionId);
      alert('Voted successfully...\n\n Tx ID: ' + result.transactionId + "\n\n------> V O T E <------");
    console.log(result.transactionId);

			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "candidateVoteAsset":null,
        
      
        
          "ifVotedAsset":null
        
      
      });
      location.reload();
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
  }



  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.servicevote.getTransaction(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "candidateVoteAsset":null,
          
        
          
            "ifVotedAsset":null
          
        
      };



      
        if(result.candidateVoteAsset){
          
            formObject.candidateVoteAsset = result.candidateVoteAsset;
          
        }else{
          formObject.candidateVoteAsset = null;
        }
      
        if(result.ifVotedAsset){
          
            formObject.ifVotedAsset = result.ifVotedAsset;
          
        }else{
          formObject.ifVotedAsset = null;
        }
 /*     
        if(result.transactionId){
          
            formObject.transactionId = result.transactionId;
          
        }else{
          formObject.transactionId = null;
        }
      
        if(result.timestamp){
          
            formObject.timestamp = result.timestamp;
          
        }else{
          formObject.timestamp = null;
        }
      
*/
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
      
        
          "candidateVoteAsset":null,
        
      
        
          "ifVotedAsset":null,
        
      
        
          "transactionId":null,
        
      
        
          "timestamp":null 
        
      
      });
  }

}

