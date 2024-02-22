import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazyImage.component.html'
})
export class LazyImageComponent implements OnInit{

  @Input()
  public url!:string;

  @Input()
  public alt:string = '';

  public hasLoaded:boolean = false;

  ngOnInit(): void {

    if(!this.url){
      throw new Error('Attribute "url" is required');
    }

  }

  onLoad(){
    this.hasLoaded = true;
  }



 }
