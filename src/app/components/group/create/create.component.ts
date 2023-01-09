import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GroupService } from 'src/app/group.service';
import { GroupComponent } from 'src/app/group/group.component';

@Component({
  selector: 'app-create-group',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  isVisible = false;
  isConfirmLoading = false;
  constructor(
    private groupSevice: GroupService,
    private fb: UntypedFormBuilder,
    private GroupComp: GroupComponent
  ) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      GroupName: [null, [Validators.required]],
    });
  }
  onSubmit() {
    console.log('submit')
    if (this.validateForm.valid) {
      this.groupSevice.create(this.validateForm.value).subscribe((res: any) => {
        console.log(this.validateForm.value);
        this.isConfirmLoading = false;
        this.isVisible = false;
        this.GroupComp.getAll();
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.isConfirmLoading = false;
    }
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isConfirmLoading = true;
    this.onSubmit();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.GroupComp.getAll();
  }
}
