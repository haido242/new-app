import { Component, Input } from '@angular/core';
import { GroupService } from 'src/app/group.service';
import { GroupComponent } from 'src/app/group/group.component';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  @Input() dataId : any;
  constructor(
    private groupSevice : GroupService,
    private GroupComp : GroupComponent
    ){}
  confirm(): void {
    this.deleteGroup(this.dataId)
  }
  deleteGroup(id:any){
    // console.log(id)
    this.groupSevice.del(id).subscribe((res: any) => {
      alert(res);
      this.GroupComp.getAll();
    });
  }
  cancel(): void {
    alert('click cancel');
  }
  
}
