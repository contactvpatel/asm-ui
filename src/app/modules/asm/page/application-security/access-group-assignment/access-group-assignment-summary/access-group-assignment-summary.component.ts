import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccessGroupModel } from '@app/data/schema/access-group';

import { AccessGroupAssignmentService } from '@app/data/services/access-group-assignment.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-access-group-assignment-summary',
  templateUrl: './access-group-assignment-summary.component.html',
  styleUrls: ['./access-group-assignment-summary.component.scss'],  
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
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getAccessGroupAssignment();
  }
  openNew(): void {
    this.route.navigate(['/asm/access-group-assignment/0']);
  }

  deleteSelectedAccessGroup(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected accessgroupassignments?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedAccessGroup.forEach((accessGroup) => {
           this.accessGroupAssignmentService.deleteAccessGroupAssignment(
                              accessGroup.accessGroupAssignmentId).subscribe((data) => (this.getAccessGroupAssignment()));
        });

        this.selectedAccessGroup = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'AccessGroupAssignments Deleted',
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
         this.accessGroupAssignmentService.deleteAccessGroupAssignment(
                           accessGroupAssignment.accessGroupAssignmentId).subscribe((data) =>(this.getAccessGroupAssignment()));
        this.accessGroupAssignment = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'AccessGroupAssignment Deleted',
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
      .subscribe((data) => (this.accessGroupAssignments = data,console.log(this.accessGroupAssignments)));
  }
 }
