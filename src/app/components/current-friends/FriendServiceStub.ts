import { Observable, of } from 'rxjs';
import { User } from '../../user';
import { testFriendData } from '../../friendtest';

export class FriendServiceStub { 

    public displayCurrentFriends(url: string): Observable<User[]> {

        return of(testFriendData);
    }
}
