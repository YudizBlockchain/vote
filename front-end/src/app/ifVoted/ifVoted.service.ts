import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ifVoted } from '../org.acme.voting';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ifVotedService {

	
		private NAMESPACE: string = 'org.acme.voting.ifVoted';
	



    constructor(private dataService: DataService<ifVoted>) {
    };

    public getAll(): Observable<ifVoted[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<ifVoted> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<ifVoted> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<ifVoted> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<ifVoted> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
