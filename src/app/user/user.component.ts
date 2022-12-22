import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';


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
  getAll():void {
    this.userService.getAll().subscribe((res: any) => {
      console.log(res);
      this.datas = res;
    });
  }
  deleteUser(id: any){
    console.log(id)
    this.userService.del(id).subscribe((res:any) => {
      alert(res)
      this.getAll()
    })
  }
  cancel(): void {
    alert('click cancel');
  }

  confirm(id: any): void {
    this.deleteUser(id)
    alert('click confirm');
  }
}
