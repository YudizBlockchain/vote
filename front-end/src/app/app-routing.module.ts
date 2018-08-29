import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { ifVotedComponent } from './ifVoted/ifVoted.component';
import { candidateVoteComponent } from './candidateVote/candidateVote.component';


  import { voterComponent } from './voter/voter.component';


  import { voteComponent } from './vote/vote.component';  

  import { MyPageComponent } from './my-page/my-page.component';  
const routes: Routes = [
     //{ path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'ifVoted', component: ifVotedComponent},
    
		{ path: 'candidateVote', component: candidateVoteComponent},
    
    
      { path: 'voter', component: voterComponent},
      
      
        { path: 'vote', component: voteComponent},
        { path: 'my-page', component: MyPageComponent},
        
		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
