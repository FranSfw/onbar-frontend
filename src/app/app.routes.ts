import { Routes } from '@angular/router';
import { RecipeCardComponent } from './shared/components/recipe-card/recipe-card';
import { ProfileEditComponent } from './features/profile/profile-edit/profile-edit';
import { SettingsComponent } from './features/settings/settings/settings';
import { SignUpComponent } from './features/auth/sign-up/sign-up';
import { ReviewCardComponent } from './shared/components/review-card/review-card';

export const routes: Routes = [
    //routes fir test components and features
    { path: 'recipe-card', component: RecipeCardComponent },
    { path: 'profile-edit', component: ProfileEditComponent },
    { path: 'review-card', component: ReviewCardComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'sign-up', component: SignUpComponent },

    

];
