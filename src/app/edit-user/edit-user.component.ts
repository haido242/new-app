import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EdiUserComponent implements OnInit{
  user: User[] = [];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getRoute(this.route.snapshot.params['id']);
  }
  getRoute(id: any) {
    this.userService.find(id).subscribe((res: any) => {
      console.log(res)
      this.user = res;
    });
  }
  onSubmit(e){
   
    console.log('submit')
  }
}
