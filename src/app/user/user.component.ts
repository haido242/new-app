import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { Group } from '../model/group.model';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  nameFilterFn = (list: string[], item: User): boolean =>
  list.some((name) => item.GroupId.indexOf(name) !== -1);
  Group: Group[] = [];
  datas: User[] = [];
  listOfCurrentPageData: readonly User[] = [];
  searchValue = '';
  requestQuery = ""
  visible = false;
  listOfDisplayData = [...this.datas];
  filterName = [
    { text: 'Admin', value: '63a3ff18053f2146c03ac0a7' },
    { text: 'Hr', value: '63a3ff1f053f2146c03ac0a8' },
  ];

  constructor(
    private userService: UserService,
    private groupService: GroupService
  ) {}
  sort(options:any){
    this.searchValue += `sort=${options}`
  }
  onCurrentPageDataChange($event: readonly User[]): void {
    this.listOfCurrentPageData = $event;
  }
  search(): void {
    this.visible = false;
    this.searchOnDB()
  }
  reset(): void {
    this.visible = false;
    this.searchValue = '';
    this.getAll();
  }
  ngOnInit(): void {
    this.getAll();
    this.getAllGroup()
  }
  getAll(): void {
    this.userService.getAll().subscribe((res: any) => {
      console.log(res);
      this.datas = res;
      this.listOfDisplayData = this.datas;
    });
  }
  getAllGroup(): void {
    this.groupService.getAll().subscribe((res: any) => {
      console.log(res);
      this.Group = res;
    });
  }
  searchOnDB(): void{
    this.userService.search(this.searchValue).subscribe((res:any) =>{
      console.log(res)
      this.listOfDisplayData = res
    })
  }
  deleteUser(id: any) {
    console.log(id);
    this.userService.del(id).subscribe((res: any) => {
      alert(res);
      this.getAll();
    });
  }
  cancel(): void {
    alert('click cancel');
  }

  confirm(id: any): void {
    this.deleteUser(id);
  }
}
