import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    
  ],
  exports: [HttpClientModule]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard { 
  //Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
