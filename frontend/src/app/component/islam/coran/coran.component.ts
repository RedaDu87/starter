import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Sourate } from '../model/sourate.modele';
import { Aya } from '../model/aya.modele';
import { AlquranService } from '../services/coran/alquran.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coran',
  templateUrl: './coran.component.html',
  styleUrls: ['./coran.component.css']
})
export class CoranComponent implements AfterViewInit{


  @ViewChildren('ayaElement') ayaElements!: QueryList<ElementRef>;

  isArabChecked = true;
  isFrChecked = true;
  isTransChecked = false;
  title : any = "";

  listeSourah : any = [];

  sourahNumber : number = 1;

  donnee :any= 'coranconsumer';

  sourah : Sourate = new Sourate();

  aya : Aya = new Aya();

  myDropDown : string = "1";
  ayaSelect :string = "";
  currentIndex = 0; // L'index du verset actuellement joué

  onChangeofOptions(newGov: any) {
    if (this.audioTable.length !=0) this.pauseaya();
    console.log("+++++++",this.myDropDown);
     this.currentIndex = 0;
    this.sourahNumber = newGov;
    this.sourah = new Sourate();
    this.getSourate();
    this.audioTable.forEach(i => i = null);
    this.audioTable = new Array();
    this.goToAnchor1();

}

constructor( public alquranService : AlquranService,private router: Router){}
  ngAfterViewInit(): void {

    this.goToAnchor1();
  }


  ngOnInit(): void {
    this.ayaSelect= "https://cdn.islamic.network/quran/audio/128/ar.hudhaify/2.mp3";

    this.alquranService.getSouratesList().subscribe({
      next : (datas)=> {
              this.listeSourah = datas;
              this.listeSourah.data.sort(function (a: any, b: any) {
                return b.number - a.number;
            });
      },
      error : ()=>{},
      complete : ()=>{
      this.getSourate();

      }
    });





  }


  getSourate(){
    this.alquranService.getExemple(this.sourahNumber).subscribe({
      next : (datas)=> {
        this.sourah.title = datas.data[0].name+" - "+datas.data[0].englishName;
        datas.data[0].ayahs.forEach((x: any,index : number)=>{
          this.aya = new Aya();
          // this.aya = new Aya(
          //   x.text,
          //   datas.data[2].ayahs[index].text,
          //   x.audio,
          //   datas.data[1].ayahs[index].audio
          //   );
          console.log(index);

          this.aya.audioAr = x.audio;
          this.aya.ayaAr = x.text;
          this.aya.ayatr = datas.data[1].ayahs[index].text;
          this.aya.audioFr = datas.data[2].ayahs[index].audio;
          this.aya.ayaFr = datas.data[3].ayahs[index].text;
          this.sourah.ayas.push(this.aya);

        });
        //this.ayaSelect = this.sourah.ayas[0].audioAr;
        console.log(this.ayaSelect);

      },
      error : ()=>{},
      complete : ()=>{
        console.log(this.sourah);

      }
    });
  }

  sourateSuivante(){
    this.sourahNumber++;
    if (this.sourahNumber > 114){
      this.sourahNumber = 1;
    }
    this.myDropDown = this.sourahNumber.toString();
    this.sourah = new Sourate();
    this.getSourate();
  }

  souratePrecedante(){
    this.sourahNumber--;
    if (this.sourahNumber < 1){
      this.sourahNumber = 114;
    }
    this.myDropDown = this.sourahNumber.toString();
    this.sourah = new Sourate();
    this.getSourate();
  }

  private audioObj = new Audio();
  audioplayer : any;
  promessePlay :any;

  audioTable : any[] = new Array();




  // Appeler cette méthode après chaque changement de verset
  playayaAr() {
    if (this.audioTable.length != 0) this.pauseaya();
    this.audioTable.forEach(i => i = null);
    this.audioTable.length = 0;
    this.currentIndex = 0;

    this.sourah.ayas.forEach((item, index) => {
      this.audioObj = new Audio();
      this.audioObj.src = item.audioAr;
      this.audioTable.push(this.audioObj);

      // Quand l'audio se termine, jouer le suivant et scroller
      this.audioTable[index].addEventListener('ended', () => {
        if (index + 1 < this.audioTable.length) {
          this.audioTable[index + 1].play();
          this.currentIndex = index + 1;
          this.scrollToAya(this.currentIndex);  // Scroll vers le prochain verset
        }
      });
    });

    this.audioTable[0].play();
    this.scrollToAya(0);  // Scroll vers le premier verset
  }

playayaFr() {
  if (this.audioTable.length != 0) this.pauseaya();
  this.audioTable.forEach(i => i = null);
  this.audioTable.length = 0;
  this.currentIndex = 0;

  this.sourah.ayas.forEach((item, index) => {
    this.audioObj = new Audio();
    this.audioObj.src = item.audioFr;
    this.audioTable.push(this.audioObj);

    // Quand l'audio se termine, jouer le suivant et scroller
    this.audioTable[index].addEventListener('ended', () => {
      if (index + 1 < this.audioTable.length) {
        this.audioTable[index + 1].play();
        this.currentIndex = index + 1;
        this.scrollToAya(this.currentIndex);  // Scroll vers le prochain verset
      }
    });
  });

  this.audioTable[0].play();
  this.scrollToAya(0);  // Scroll vers le premier verset
  }

pauseaya(){
  console.log(this.currentIndex);

  this.audioTable[this.currentIndex].pause();
}

reprendreaya(){
  if (this.audioTable.length !=0) this.pauseaya();
    this.audioTable.forEach(i => i = null);
    this.audioTable.length =0;

    this.sourah.ayas.forEach((item)=>{
        this.audioObj = new Audio();
       this.audioObj.src = item.audioAr;

       this.audioTable.push(this.audioObj);
    });

    for (let i =0; i < this.audioTable.length;i++){
      this.audioTable[i].addEventListener('ended', () => {
        this.audioTable[i+1].play();
        this.currentIndex++;
            console.log(this.audioTable[i+1]);
            this.goToAnchor1();
          });

    }
  this.audioTable[this.currentIndex].play();
}



goToAnchor1() {
  this.router.navigate(['/coran'], { fragment: (this.currentIndex+1).toString() });
}

  // Méthode pour faire défiler vers le verset en cours
  scrollToAya(index: number) {
    const ayaElement = this.ayaElements.toArray()[index];
    if (ayaElement) {
      ayaElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }



playanayaAr(i :number){
  if (this.audioTable.length !=0) this.pauseaya();
  this.audioTable.forEach(i => i = null);
  this.audioTable.length =0;
  this.currentIndex = 0;
  this.sourah.ayas.forEach((item)=>{
      this.audioObj = new Audio();
     this.audioObj.src = item.audioAr;

     this.audioTable.push(this.audioObj);
  });
  if (this.audioTable.length !=0) this.pauseaya();

  this.sourah.ayas.forEach((item)=>{
    this.audioObj = new Audio();
   this.audioObj.src = item.audioAr;

   this.audioTable.push(this.audioObj);
});
this.currentIndex =i;
console.log(this.audioTable[i+1]);
// this.goToAnchor1();
this.audioTable[i].addEventListener('ended', () => {
  this.audioTable[i+1].pause();

    });
    this.audioTable[i].currentTime = 0;
  this.audioTable[i].play();

}

playanayaFr(i :number){
  if (this.audioTable.length !=0) this.pauseaya();
    this.audioTable.forEach(i => i = null);
    this.audioTable.length =0;
    this.currentIndex = 0;
    this.sourah.ayas.forEach((item)=>{
        this.audioObj = new Audio();
       this.audioObj.src = item.audioFr;

       this.audioTable.push(this.audioObj);
    });


  if (this.audioTable.length !=0) this.pauseaya();

  this.sourah.ayas.forEach((item)=>{
    this.audioObj = new Audio();
   this.audioObj.src = item.audioFr;

   this.audioTable.push(this.audioObj);
});
this.currentIndex =i;
console.log(this.audioTable[i+1]);
// this.goToAnchor1();
this.audioTable[i].addEventListener('ended', () => {
  this.audioTable[i+1].pause();

    });
    this.audioTable[i].currentTime = 0;
  this.audioTable[i].play();

}


  }






