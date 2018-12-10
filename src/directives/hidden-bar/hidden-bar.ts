import { Directive, Input, ElementRef, Renderer } from '@angular/core';
@Directive({
  selector: '[hidden-bar]',
  host:{
  	'(ionScroll)':'onContentScroll($event)'
  }
})
export class HiddenBarDirective {
  @Input("header") header:HTMLElement;
  headerheight:any;
  constructor(public element:ElementRef, public renderer:Renderer) {
    console.log('Hello HiddenBarDirective Directive');
  }
  ngOnInit(){
  	this.headerheight = this.header.clientHeight;
  	this.renderer.setElementStyle(this.header,'top','-56px');
  	this.renderer.setElementStyle(this.header,'webkitTransition','top 700ms');
  }
  onContentScroll(event){
   console.log(event);
   if(event.scrollTop>56){
   	this.renderer.setElementStyle(this.header,'top','0px');
   	this.renderer.setElementStyle(this.header,'backgroundColor','#f53d3d');
   }else{
   	this.renderer.setElementStyle(this.header,'top','-56px');
   }
  }

}