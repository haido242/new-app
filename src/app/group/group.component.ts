import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../model/group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit{
  constructor(private groupSevice : GroupService){
  }
  Group: Group[] = []
  displayData = [...this.Group]
  ngOnInit(){
    this.getAll()
  }
  getAll(){
    this.groupSevice.getAll().subscribe((res: any) =>{
      this.Group= res
    })
  }
}
