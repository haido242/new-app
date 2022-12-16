import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EdiUserComponent implements OnInit {
  user: User[] = [];
  editForm = this.formBuilder.group({
    UserName : "",
    Gender:'',
    Email:'',
    GroupId:''
  })
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRoute(this.route.snapshot.params['id']);
  }
  getRoute(id: any) {
    this.userService.find(id).subscribe((res: any) => {
      console.log(res);
      this.user = res;
    });
  }
  onSubmit() {
    
    this.userService.update(this.route.snapshot.params['id'], this.editForm.value).subscribe((res:any)=>console.log(res))
    console.log('submit');
    console.log(this.route.snapshot.queryParamMap.getAll('UserName'));
  }
}
