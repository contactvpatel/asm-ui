import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessGroupModel } from '@app/data/schema/access-group';
import { IsActive } from '@app/data/schema/module';
import { AccessGroupService } from '@app/data/services/access-group.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-access-group-summary',
  templateUrl: './access-group-summary.component.html',
  styleUrls: ['./access-group-summary.component.scss']
})
export class AccessGroupSummaryComponent implements OnInit {
  accessGroups: AccessGroupModel[];

  accessGroup: AccessGroupModel;

  selectedAccessGroup: AccessGroupModel[];
  
  submitted: boolean;

  constructor(
    private accessGroupService: AccessGroupService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getAccessGroup();
  }

  openNew(): void {
    this.route.navigate(['/asm/application-security/access-group/create']);
  }

  editAccessGroup(access: any): void {
    this.route.navigate([
      '/asm/application-security/access-group/edit/' + access.accessGroupId
    ]);
  }

  deleteSelectedAccessGroup(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected accessgroups?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedAccessGroup.forEach((accessGroup) => {
          this.accessGroupService
            .deleteAccessGroup(accessGroup.accessGroupId)
            .subscribe((data) => this.getAccessGroup());
        });

        this.selectedAccessGroup = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'AccessGroups Deleted',
          life: 3000
        });
      }
    });
  }

  deleteAccessGroup(accessGroup: AccessGroupModel): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + accessGroup.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accessGroupService
          .deleteAccessGroup(accessGroup.accessGroupId)
          .subscribe((data) => this.getAccessGroup());
        this.accessGroup = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'AccessGroup Deleted',
          life: 3000
        });
      }
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.accessGroups.length; i++) {
      if (this.accessGroups[i].name === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  getAccessGroup(): void {
    this.accessGroupService
      .getAccessGroup()
      .subscribe((data) => (this.accessGroups = data));
  }
}
