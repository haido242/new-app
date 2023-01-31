import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { GroupService } from '../group.service';
import { Group } from '../model/group.model';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

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
  emailSearchVisible = false;
  pageIndex = 1;
  total = 10;
  pageSize = 10;
  sortQuery = {};
  checkOptionsTwo = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female'}
  ];
  filterName = '';
  filter = '';
  params = { page: this.pageIndex, limit: this.pageSize };
  listOfDisplayData = [...this.datas];

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  log(value: object[]): void {
    console.log(value);
  }
  sort(option: string) {
    this.sortQuery = { sort: option };
    this.params = Object.assign({}, this.params, this.sortQuery);
    this.setRouteParams();
    this.getAll();
  }
  setFilter(filterName: any, filter: any) {
    let filterQuery = { filter: filter, field: filterName };
    this.params = Object.assign({}, this.params, filterQuery);
    this.setRouteParams();
    // this.getAll();
  }
  async setRouteParams() {
    const urlParams = Object.assign(
      {},
      this.route.snapshot.queryParams,
      this.params
    );
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: urlParams,
    });
    this.getAll();
  }
  logger() {
    let newParams = {
      page: this.pageIndex,
      limit: this.pageSize,
    };
    this.params = Object.assign({}, this.params, newParams);
    this.setRouteParams();
  }
  async clearFilter() {
    this.params = { page: 1, limit: 10 };
    await this.router.navigate([], { relativeTo: this.route, queryParams: {} });
    this.getAll();
  }
  search(field: any): void {
    this.visible = false;
    this.searchOnDB(field);
  }
  reset(): void {
    this.visible = false;
    this.searchValue = '';
    this.getAll();
  }
  ngOnInit(): void {
    // this.setDefaultParams();
    this.getAllGroup();
    this.getAll();
  }
  async getAll() {
    let parameter = this.route.snapshot.queryParams;
    this.userService.getAllAndPagination(parameter).subscribe((res: any) => {
      this.datas = res.data;
      this.total = res.total;
      this.listOfDisplayData = this.datas;
      this.pageSize = res.limit;
      this.pageIndex = res.page;
      res.data.forEach((Element: any) => {
        for (const e of this.Group) {
          if (Element.GroupId == e._id) {
            Element.GroupName = e.GroupName;
            break;
          } else {
            Element.GroupName = 'Group Not Found';
          }
        }
      });
    });
  }
  getAllGroup(): void {
    this.groupService.getAll().subscribe((res: any) => {
      this.Group = res;
    });
  }
  searchOnDB(field:any): void {
    this.userService.search(field,this.searchValue).subscribe((res: any) => {
      this.listOfDisplayData = res;
    });
  }
  deleteUser(id: any) {
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
  arr: any = [];
  param = new HttpParams()
  async testParms(name: any, value: any) {
    
    this.param = this.param.append(name, value)
    console.log(this.param.toString())
    
    this.userService.test(this.param).subscribe()

  }
}
