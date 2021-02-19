import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptPipe } from '@app/modules/encrypt/pipes/encrypt.pipe';
import { IAccessGroup } from '@app/data/schema/access-group';
import { Utils } from '@app/shared/utils/util';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AccessGroupService } from '@app/data/services/access-group.service';

@Component({
  selector: 'app-access-group-detail',
  templateUrl: './access-group-detail.component.html',
  styleUrls: ['./access-group-detail.component.scss'],
  providers: [EncryptPipe, ConfirmationService],
})
export class AccessGroupDetailComponent implements OnInit, OnDestroy {
  accessGroup: IAccessGroup;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private accessGroupService: AccessGroupService
  ) {}

  ngOnInit(): void {
    this.accessGroup = {} as IAccessGroup;
    this.route.paramMap.subscribe((params) => {
      const accessGroupId = Utils.decrypt(params.get('id')) || 0;
      if (accessGroupId > 0) {
        this.GetAccessGroupById(accessGroupId);
      } else {
        this.accessGroup = {} as IAccessGroup;
      }
    });
  }

  GetAccessGroupById(id: number) {
    /*
    this.accessGroupService.GetEventById(id).subscribe(res => {
      this.accessGroup= res.body.data
    });
    */
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
