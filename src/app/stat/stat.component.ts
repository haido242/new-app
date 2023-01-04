import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent {
  data: User[] = []
  date = new Date
  constructor(
    private userService: UserService
  ){}
  
  onChange($event:any){
    console.log(this.date)
    
    this.userService.getByDateRange(this.date).subscribe((res:any) => {
      console.log(res.data)
      this.data = res.data
    })
  }
}
