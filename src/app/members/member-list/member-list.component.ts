import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { UserParams } from 'src/app/models/userParams';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  pagination : Pagination | undefined;
  userParams : UserParams | undefined;
  user : User | undefined;
  genderList = [{value : 'female', display : 'Males'}, {value : 'male', display : 'Females'}]

  constructor(private memberService: MembersService, private accountService : AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next : user => {
        if(user){
          this.userParams = new UserParams(user);
          this.userParams.gender = this.userParams.gender.toLowerCase();
          this.user = user
        }
      }
    })
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  resetFilters(){
    if(this.user){
      this.userParams = new UserParams(this.user);
      this.loadMembers();
    }
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe({
      next : response =>{
        if(response.result && response.pagination){
          this.members = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }

  pageChanged(event:any){
    if(this.userParams.pageNumber !== event.page){
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    }
  }
}
