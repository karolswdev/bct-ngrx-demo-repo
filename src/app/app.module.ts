import { AppMaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { VisibleTodosPipe } from './visibleTodosPipe';
import { FlipComponent, FlipSection } from './flip.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoaderComponent } from './loader.component';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    AppComponent, VisibleTodosPipe, FlipComponent, FlipSection, LoaderComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent, LoginComponent]
})
export class AppModule { }
