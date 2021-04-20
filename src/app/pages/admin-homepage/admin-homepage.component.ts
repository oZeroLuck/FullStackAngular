import { Component, OnInit } from '@angular/core';
import { UserClass } from '../../../models/user-class';
import { UserTable } from '../../table-cfg/table-user-config';
import { UsersService } from '../../../services/users.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionWrapper } from '../../../models/action-wrapper';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit {

  users$: Observable<UserClass[]>;
  testTable = UserTable;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.usersService.getUsers();
  }

  dispatch($event: ActionWrapper): void {
    switch ($event.action) {
      case 'add':
        console.log('Im here');
        this.router.navigate(['./customer/add'], {relativeTo: this.route});
        break;
      case 'edit':
        this.router.navigate(['./customer/edit/' + $event.obj.id], {relativeTo: this.route});
        break;
      case 'delete':
        if (confirm('Are you sure?')) {
          this.delete($event.obj);
        } else {return; }
        break;
      default :
        console.log('WRONG OP CODE');
        break;
    }
  }

  delete(user: UserClass): void {
    this.usersService.delete(user)
      .subscribe();
    this.getUsers();
  }
}