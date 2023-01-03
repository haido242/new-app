import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { Group } from '../model/group.model';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { group } from '@angular/animations';
import { skip } from 'rxjs';

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
  visible = false;
  pageIndex = 1
  total = 10
  pageSize = 10
  sortQuery = ''
  params = `page=${this.pageIndex}&limit=${this.pageSize}`
  listOfDisplayData = [...this.datas];
  filterName = [
    { text: 'Admin', value: '63a3ff18053f2146c03ac0a7' },
    { text: 'Hr', value: '63a3ff1f053f2146c03ac0a8' },
  ];
  constructor(
    private userService: UserService,
    private groupService: GroupService
  ) {}
  sort(option: string){
    this.sortQuery = option
    this.getAll()
    console.log()
  }
  // onCurrentPageDataChange($event: readonly User[]): void {

  //   this.listOfCurrentPageData = $event;
  // }
  logger(){
    this.params = `page=${this.pageIndex}&limit=${this.pageSize}`
    this.getAll()
    // console.log(this.pageIndex, this.pageSize)
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
    this.getAllGroup()
    this.getAll();
  }
  getAll(): void {
    this.userService.getAllAndPagination(this.pageIndex, this.pageSize, this.sortQuery).subscribe((res: any) => {
      console.log(res);
      this.datas = res.data;
      this.total = res.total
      this.listOfDisplayData = this.datas;
      res.data.forEach((Element: any) => {
        for (const e of this.Group) {
          if(Element.GroupId == e._id){
            Element.GroupName = e.GroupName
            console.log(e._id)
            break
          }else{
            Element.GroupName ="Group Not Found"
          }
          
        }
      })
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
