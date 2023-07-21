import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { PaginatedResults } from '../models/pagination';
import { map } from 'rxjs';
import { UserParams } from '../models/userParams';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers(userParams: UserParams) {
    let params = this.getPaginationHeaders(userParams);

    return this.getPaginatedResult<Member[]>(this.baseUrl , params);
  }



  getMember(username: string) {
    return this.http.get<Member>(this.baseUrl + 'user/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'user/updateuser', member);
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'user/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'delete-photo/' + photoId);
  }

  private getPaginationHeaders(userParams : UserParams) {
    let params = new HttpParams();
    if(userParams.pageNumber){
      params = params.append('pageNumber', userParams.pageNumber);
    }
    if(userParams.pageSize){
      params = params.append('pageSize', userParams.pageSize);
    }
    if(userParams.minAge){
      params = params.append('minAge', userParams.minAge);
    }
    if(userParams.maxAge){
      params = params.append('maxAge', userParams.maxAge);
    }
    if(userParams.gender){
      params = params.append('gender', userParams.gender);
    }
    if(userParams.orderBy){
      params = params.append('orderBy', userParams.orderBy);
    }
    return params;
  }

  private getPaginatedResult<T>(url : string, params: HttpParams) {
    const paginatedResults: PaginatedResults<T> = new PaginatedResults<T>();
    return this.http
      .get<T>(url + 'users', { observe: 'response', params })
      .pipe(
        map((response) => {
          if (response.body) {
            paginatedResults.result = response.body;
          }
          const pagination = response.headers.get('Pagination');
          if (pagination) {
            paginatedResults.pagination = JSON.parse(pagination);
          }
          return paginatedResults;
        })
      );
  }
}
