import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { ifVotedComponent } from './ifVoted/ifVoted.component';
import { candidateVoteComponent } from './candidateVote/candidateVote.component';


  import { voterComponent } from './voter/voter.component';


  import { voteComponent } from './vote/vote.component';
import { MyPageComponent } from './my-page/my-page.component';  
@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    ifVotedComponent,
    
    candidateVoteComponent
    ,
    
    
      voterComponent
      ,

    
        voteComponent,

    
        MyPageComponent
          
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
