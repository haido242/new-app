import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  newUser: any
  createForm = this.formBuilder.group({
    UserName : "",
    Password : "",
    Gender:'',
    Email:'',
    GroupId:''
  })
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {}
  onSubmit(){
    console.log(this.createForm.value)
    this.userService.create( this.createForm.value).subscribe((res:any)=>console.log(res))
    console.log(this.route.snapshot.queryParamMap.getAll('UserName'));
  }
}
