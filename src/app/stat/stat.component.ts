import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit{
  data: User[] = []
  date = new Date()
  totalInRange = 0
  total = 0
  constructor(
    private userService: UserService
  ){}
  ngOnInit(){
    this.getByDateRange([this.date,this.date])
  }
  onChange($event:any){
    this.getByDateRange(this.date)
  }
  getByDateRange(date:any){
    this.userService.getByDateRange(date).subscribe((res:any)=>{
      this.data = res.data
      this.totalInRange = res.count
      this.total = res.total
      for (const item of this.data) {
        item.CreateAt = new Date(item.CreateAt).toDateString()
      }
    })
  }
}
