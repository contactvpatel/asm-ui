import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessGroupModel } from '@app/data/schema/access-group';
import { AccessGroupAssignmentService } from '@app/data/services/access-group-assignment.service';
import { AppBreadcrumbService } from '@app/layout/app.breadcrumb.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-access-group-assignment-summary',
  templateUrl: './access-group-assignment-summary.component.html',
  styleUrls: ['./access-group-assignment-summary.component.scss']
})
export class AccessGroupAssignmentSummaryComponent implements OnInit {
  accessGroupAssignments: AccessGroupModel[];

  accessGroupAssignment: AccessGroupModel;

  selectedAccessGroup: AccessGroupModel[];

  submitted: boolean;

  constructor(
    private accessGroupAssignmentService: AccessGroupAssignmentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private route: Router,
    private breadcrumbService: AppBreadcrumbService
  ) {
    this.breadcrumbService.setItems([
      {
        label: 'Access Group Assignment',
        routerLink: ['/application-security/access-group-assignment']
      },
      { label: 'Summary' }
    ]);
  }

  ngOnInit(): void {
    this.getAccessGroupAssignment();
  }
  openNew(): void {
    this.route.navigate(['/application-security/access-group-assignment/0']);
  }

  deleteSelectedAccessGroup(): void {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete the selected Access Group Assignment(s)?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedAccessGroup.forEach((accessGroup) => {
          this.accessGroupAssignmentService
            .deleteAccessGroupAssignment(accessGroup.accessGroupAssignmentId)
            .subscribe((data) => this.getAccessGroupAssignment());
        });

        this.selectedAccessGroup = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Access Group Assignment(s) are deleted',
          life: 3000
        });
      }
    });
  }

  deleteAccessGroupAssignment(accessGroupAssignment: AccessGroupModel): void {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + accessGroupAssignment.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.accessGroupAssignmentService
          .deleteAccessGroupAssignment(
            accessGroupAssignment.accessGroupAssignmentId
          )
          .subscribe((data) => this.getAccessGroupAssignment());
        this.accessGroupAssignment = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Access Group Assignment is deleted',
          life: 3000
        });
      }
    });
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.accessGroupAssignments.length; i++) {
      if (this.accessGroupAssignments[i].name === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  getAccessGroupAssignment(): void {
    this.accessGroupAssignmentService
      .getAccessGroupAssignment()
      .subscribe((data) => (this.accessGroupAssignments = data));
  }
}
