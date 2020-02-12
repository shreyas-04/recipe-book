import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";

import { DropdownDirective } from "./dropdown.directive";

import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { AlertComponent } from "./alert/alert.component";


@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent,
        AlertComponent,
        DropdownDirective,
        CommonModule
    ]
})

export class SharedModule {}