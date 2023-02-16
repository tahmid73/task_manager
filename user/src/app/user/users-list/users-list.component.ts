import { Component, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent{
  @Input() user!:User[];
  
}
