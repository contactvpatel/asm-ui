import { NgModule } from '@angular/core';
import { EncryptPipe } from './pipes/encrypt.pipe';

@NgModule({
  declarations: [EncryptPipe],
  exports: [EncryptPipe],
})
export class EncryptPipeModule {}
