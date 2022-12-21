import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  datas: User[] = [];
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.userService.getAll().subscribe((res: any) => {
      console.log(res);
      this.datas = res;
    });
  }
  cancel(): void {
    alert('click cancel');
  }

  confirm(): void {
    alert('click confirm');
  }
}
