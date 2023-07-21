import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() member!: Member;

  uploader!: FileUploader;
  hasBaseDropZoneOver!: boolean;
  hasAnotherDropZoneOver!: boolean;
  user!: User;
  baseUrl = environment.apiUrl;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toast : ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'user/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo : Photo = JSON.parse(response);
        this.member.photos.push(photo);
        if(photo.isMain){
          this.user.photoUrl = photo.url,
          this.member.photoUrl = photo.url,
          this.accountService.setCurrentUser(this.user)
        }
      }
    };
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  uploadAll(){
    this.uploader.uploadAll();
  }

  setMainPhoto(photo : Photo){
    this.memberService.setMainPhoto(photo.id).subscribe({
      next : () =>{
        this.user.photoUrl = photo.url;
        this.accountService.setCurrentUser(this.user);
        this.member.photoUrl = photo.url;
        this.member.photos.forEach(p=>{
          if(p.isMain) p.isMain = false;
          if(p.id === photo.id) p.isMain = true;
        });
      }
    })
  }

  deletePhoto(photo : Photo){
    this.memberService.deletePhoto(photo.id).subscribe({
      next : ()=>{
        this.toast.success('Photo Deleted successfully');
        this.member.photos = this.member.photos.filter(x=>x.id !== photo.id);
      }
    })
  }
}
