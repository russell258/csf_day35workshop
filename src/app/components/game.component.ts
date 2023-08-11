import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy{
  @Input() pagePerRec = 0;
  games!: Game[];
  currentIndex: number = 0;
  pageNo: number = 1;
  sub$!: Subscription;

  constructor(private gameSvc: GameService){}

  ngOnInit():void{
    console.log("pagePerRec "+ this.pagePerRec);
    if (this.pagePerRec==null){
      this.pagePerRec=5;
    this.sub$ = this.gameSvc
                    .getGames(this.pagePerRec,this.currentIndex)
                    .subscribe((result)=>{
                      this.games=result;
                      console.log(this.games.length);
                    })
    }
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe;
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['pagePerRec'].currentValue==null){
      this.pagePerRec=5;
    }else{
      this.pagePerRec=changes['pagePerRec'].currentValue;
    }

    this.gameSvc
        .getGames(this.pagePerRec,this.currentIndex)
        .subscribe((result)=>{
          this.games=result;
          console.log(this.games.length);
        })
  }

  private fetchData(pagePerRec: number, currentIndex:number){
    this.gameSvc.getGames(pagePerRec,currentIndex).subscribe((result)=>{
      /////////////////////fill in
    })
  }

  previousPage(){
    this.pageNo--;
    this.currentIndex=this.currentIndex-this.pagePerRec;
  }

  nextPage(){
    this.pageNo++;
    this.currentIndex=this.currentIndex+this.pagePerRec;
  }


}
