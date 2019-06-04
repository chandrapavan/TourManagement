import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ShowService } from '../shared/show.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ShowSingleComponent } from '../show-single/show-single.component';

@Component({
  selector: 'app-show-add',
  templateUrl: './show-add.component.html',
  styleUrls: ['./show-add.component.css']
})

export class ShowAddComponent implements OnInit { 
  private sub:Subscription;
  private tourId:string;
  public showCollectionForm: FormGroup;

  constructor(private showService: ShowService,
    private route: ActivatedRoute,
    private formbuilder:FormBuilder,
    private router:Router){

    }

  ngOnInit() {

    this.showCollectionForm = this.formbuilder.group({
      shows:this.formbuilder.array([])
    });
    this.addShow();
      this.sub = this.route.params.subscribe(
        params => {
          this.tourId = params['tourId'];
        }
      );
  }

addShow():void
{
  let showFormArray = this.showCollectionForm.get('shows') as FormArray;
  showFormArray.push(ShowSingleComponent.createShow());
}

addShows():void
{
  if(this.showCollectionForm.dirty && 
    this.showCollectionForm.value.shows.length){
let showCollection = automapper.map('ShowCollectionFormModelShowsArray',
'ShowCollectionForCreation', this.showCollectionForm.value.shows);

this.showService.addShowCollection(this.tourId,showCollection)
.subscribe(() => {
  this.router.navigateByUrl('/tours')});

  }
}

ngOnDestroy(): void{
  this.sub.unsubscribe();
}

}
