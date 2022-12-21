import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { EdiUserComponent } from './edit-user/edit-user.component';
import { GroupComponent } from './group/group.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DeleteUserComponent } from './components/delete-user.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DelUserComponent } from './components/del-user/del-user.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzMenuModule } from 'ng-zorro-antd/menu';



@NgModule({
  declarations: [AppComponent, HeaderComponent, UserComponent, EdiUserComponent, GroupComponent, CreateUserComponent, DeleteUserComponent, DelUserComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, NzFormModule, NzLayoutModule, NzInputModule,NzButtonModule, NzIconModule, NzModalModule,NzPopconfirmModule, FormsModule, BrowserAnimationsModule, IconsProviderModule, NzMenuModule],
  providers: [
 
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {

}
