import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { candidateVote } from '../org.acme.voting';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class candidateVoteService {

	
		private NAMESPACE: string = 'org.acme.voting.candidateVote';
	



    constructor(private dataService: DataService<candidateVote>) {
    };

    public getAll(): Observable<candidateVote[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<candidateVote> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<candidateVote> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<candidateVote> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<candidateVote> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
