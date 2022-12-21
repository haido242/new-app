import { Component } from '@angular/core';

import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'delete-user-component',
  template: ` <button nzShape="circle" nz-button nzType="primary" nzDanger (click)="showConfirm()")>
  <span nz-icon nzType="delete" nzTheme="outline"></span>
</button> `
})
export class DeleteUserComponent {
  confirmModal?: NzModalRef; // For testing by now

  constructor(private modal: NzModalService) {}

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }
}