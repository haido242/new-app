import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { Group } from '../model/group.model';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit{
  validateForm!: UntypedFormGroup;
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
    private groupService: GroupService,
    private fb: UntypedFormBuilder
  ) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      UserName: [null,[Validators.required, Validators.minLength(6)]],
      Password: [null, [Validators.required, Validators.minLength(6)]],
      Gender : [null, [Validators.required]],
      Email: [null, [Validators.required, Validators.email]],
      GroupId: [null, [Validators.required]],
      CreateAt: Date.now()
    });
  }
  onSubmit() {
    if(this.validateForm.valid){
      
      this.userService.create(this.validateForm.value).subscribe((res: any) => {
        this.isConfirmLoading = false;
        this.isVisible = false;
        this.userComp.getAll()
      });
    }else{
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.isConfirmLoading = false
    }
  }
  showModal(): void {
    this.getAllGroup()
    this.isVisible = true;
  }
  Group: Group[] = []
  group = null
  getAllGroup(): void{
      this.groupService.getAll().subscribe((res: any) => {
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
