import { Component } from '@angular/core';
import { pageTransition } from 'src/app/shared/utils/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  animations: [pageTransition]
})
export class UsersComponent {

}
