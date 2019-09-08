import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './user.service'; 
import { Injectable } from '@angular/core';

@Injectable()
export class UserGuardService {

    constructor(private _userService: UserService,
    private _router: Router) {

    }

    loggedIn(){
        return !!localStorage.getItem('id')
    }
}

