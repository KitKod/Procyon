import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { AddTestDialogResult } from './add-test-dialog.data';
import { TestStatus, TestType } from '@core/store/test';
import { AmeFamily } from '@core/store/ame/ame.model';
import { ConfirmationDialogService } from '@core/confirmation-dialog';

@Component({
    selector: 'procyon-add-test-dialog',
    templateUrl: './add-test-dialog.component.html',
    styleUrls: ['./add-test-dialog.component.scss'],
})
export class AddTestDialogComponent implements OnInit, OnDestroy {
    readonly createNewManufacturerId = -1;

    readonly testInfoStepFormGroup = this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
        location: ['', Validators.required],
        status: ['', Validators.required],
    });

    readonly ameInfoStepFormGroup = this.fb.group({
        name: ['', Validators.required],
        family: ['', Validators.required],
        type: ['', Validators.required],
        ttc_file: [null, Validators.required],
        manufacturer: [this.createNewManufacturerId],
    });

    readonly manufacturerInfoStepFormGroup = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        chief: ['', Validators.required],
        contract: ['', Validators.required],
    });

    readonly stepperOrientation$: Observable<StepperOrientation> = this.breakpointObserver
        .observe('(min-width: 800px)')
        .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    readonly testStatuses: { label: string; value: TestStatus }[] = [
        { label: 'Preparation', value: TestStatus.Preparation },
        { label: 'Testing', value: TestStatus.Testing },
        { label: 'Paused', value: TestStatus.Paused },
        { label: 'Continued', value: TestStatus.Continued },
        { label: 'Finished', value: TestStatus.Finished },
    ];

    readonly testTypes: { label: string; value: TestType }[] = [
        { label: 'Preliminary', value: TestType.Preliminary },
        { label: 'State', value: TestType.State },
        { label: 'Interdepartmental', value: TestType.Interdepartmental },
        { label: 'Defining', value: TestType.Defining },
        { label: 'Departmental', value: TestType.Departmental },
        { label: 'Research', value: TestType.Research },
        { label: 'Control', value: TestType.Control },
        { label: 'Special', value: TestType.Special },
    ];

    readonly ameFamilies: { label: string; value: AmeFamily }[] = [
        { label: 'Aircraft', value: AmeFamily.Aircraft },
        { label: 'AeroelasticSystems', value: AmeFamily.AeroelasticSystems },
        { label: 'ArmoredVehicles', value: AmeFamily.ArmoredVehicles },
        { label: 'AutomotiveVehicles', value: AmeFamily.AutomotiveVehicles },
        { label: 'ArtilleryArmament', value: AmeFamily.ArtilleryArmament },
        { label: 'SmallArms', value: AmeFamily.SmallArms },
        { label: 'Ships', value: AmeFamily.Ships },
        { label: 'RadarSystems', value: AmeFamily.RadarSystems },
        { label: 'IntelligenceTools', value: AmeFamily.IntelligenceTools },
        { label: 'MeansREB', value: AmeFamily.MeansREB },
        { label: 'MeansOfCommunication', value: AmeFamily.MeansOfCommunication },
        { label: 'SpecialVehicles', value: AmeFamily.SpecialVehicles },
        { label: 'AntiAircraftMissileSystems', value: AmeFamily.AntiAircraftMissileSystems },
    ];

    readonly destroy$: ReplaySubject<void> = new ReplaySubject<void>(1);

    constructor(
        private dialogRef: MatDialogRef<AddTestDialogComponent, AddTestDialogResult>,
        private fb: FormBuilder,
        private breakpointObserver: BreakpointObserver,
        private confirmSrv: ConfirmationDialogService,
    ) {
        dialogRef.disableClose = true;
    }

    ngOnInit(): void {
        this.dialogRef
            .backdropClick()
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.closeWithoutSave());
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    closeWithoutSave(): void {
        this.confirmSrv.open({
            message: 'All unsaved data will be lost, are you sure you want to leave the dialog?',
            title: 'Confirm',
            affirmative: {
                label: 'Yes',
                handler: () => this.dialogRef.close(),
            },
        });
    }

    onSave(): void {
        const testInfo = this.testInfoStepFormGroup.value;
        const ameInfo = this.ameInfoStepFormGroup.value;
        const manufacturerInfo = this.manufacturerInfoStepFormGroup.value;

        this.dialogRef.close({
            ...testInfo,
            ame: {
                ...ameInfo,
                manufacturer:
                    ameInfo.manufacturer !== this.createNewManufacturerId
                        ? { id: ameInfo.manufacturer }
                        : manufacturerInfo,
            },
        });
    }
}
