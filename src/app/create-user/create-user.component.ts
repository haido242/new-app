import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { Group } from '../model/group.model';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
  newUser: any;
  createForm = this.formBuilder.group({
    UserName: '',
    Password: '',
    Gender : '',
    Email: '',
    GroupId: '',
    CreateAt: Date.now()
  });
  isVisible = false;
  isConfirmLoading = false;
  Gender = null;
  constructor(
    private userComp : UserComponent,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private groupService: GroupService
  ) {}
  onSubmit() {
    console.log(this.createForm.value);
    this.userService.create(this.createForm.value).subscribe((res: any) => {
      console.log(res);
      this.isConfirmLoading = false;
      this.isVisible = false;
      this.userComp.getAll()
    });
    console.log(this.route.snapshot.queryParamMap.getAll('UserName'));
  }
  showModal(): void {
    this.getAllGroup()
    this.isVisible = true;
  }
  Group: Group[] = []
  group = null
  getAllGroup(): void{
      this.groupService.getAll().subscribe((res: any) => {
        console.log(res)
        this.Group = res
      })
    }
  handleOk(): void {
    this.isConfirmLoading = true;
    this.onSubmit();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.userComp.getAll()
  }
}
