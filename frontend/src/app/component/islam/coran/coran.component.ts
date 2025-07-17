// coran.component.ts PROPRE ET CORRIGÉ

import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Sourate } from '../model/sourate.modele';
import { Aya } from '../model/aya.modele';
import { AlquranService } from '../services/coran/alquran.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coran',
  templateUrl: './coran.component.html',
  styleUrls: ['./coran.component.css']
})
export class CoranComponent implements AfterViewInit {

  @ViewChildren('ayaElement') ayaElements!: QueryList<ElementRef>;

  isArabChecked = true;
  isFrChecked = true;
  isTransChecked = false;
  isPlayingArabe = false;
  isPlayingFrancais = false;
  isPlayingArFr = false;
  showBackToTop = false;
  iconBouncing = false;
  currentLang: 'arabe' | 'francais' | 'arfr' = 'arabe';


  sourah: Sourate = new Sourate();
  aya: Aya = new Aya();
  listeSourah: any = [];
  isLoading: boolean = true;  // Nouveau champ
  myDropDown: string = "1";
  sourahNumber: number = 1;

  audioObj: HTMLAudioElement | null = null;
  audioTable: HTMLAudioElement[] = [];
  currentAyaIndex: number = 0;
  currentAudioIndex: number = 0;
  audioMode: 'ar' | 'fr' | 'arfr' | null = null;

  constructor(public alquranService: AlquranService, private router: Router) {
    window.addEventListener('scroll', () => {
      this.showBackToTop = window.scrollY > 300;
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.alquranService.getSouratesList().subscribe({
      next: (datas) => {
        this.listeSourah = datas;
        this.listeSourah.data.sort((a: any, b: any) => b.number - a.number);
      },
      complete: () => {
        this.getSourate();
        this.isLoading = false; // <-- Le loader disparaît
      }
    });
  }




  ngAfterViewInit(): void {
    this.scrollToAya(0);
  }

  onChangeofOptions(newSourah: any) {
    this.pauseaya();
    this.sourahNumber = newSourah;
    this.currentAyaIndex = 0;
    this.currentAudioIndex = 0;
    this.getSourate();
  }

  getSourate() {
    this.pauseaya();
    this.sourah = new Sourate();
    this.audioTable = [];

    this.alquranService.getExemple(this.sourahNumber).subscribe({
      next: (datas) => {
        const info = datas.data[0];
        this.sourah.title = info.name + ' - ' + info.englishName;

        info.ayahs.forEach((x: any, index: number) => {
          const aya = new Aya();
          aya.audioAr = x.audio;
          aya.ayaAr = x.text;
          aya.ayatr = datas.data[1].ayahs[index].text;
          aya.audioFr = datas.data[2].ayahs[index].audio;
          aya.ayaFr = datas.data[3].ayahs[index].text;
          this.sourah.ayas.push(aya);
        });
      }
    });
  }

playayaAr() {
  if (this.audioMode === 'ar' && this.audioObj) {
    this.togglePlayPause();
  } else {
    this.prepareAudioList('ar');
    const index = this.currentAyaIndex;
    this.playCurrentAudio(index);
  }
}

playayaFr() {
  if (this.audioMode === 'fr' && this.audioObj) {
    this.togglePlayPause();
  } else {
    this.prepareAudioList('fr');
    const index = this.currentAyaIndex;
    this.playCurrentAudio(index);
  }
}

playayaArFr() {
  if (this.audioMode === 'arfr' && this.audioObj) {
    this.togglePlayPause();
  } else {
    this.prepareAudioList('arfr');
    const index = this.currentAyaIndex * 2; // ar/fr = 2 audios par verset
    this.playCurrentAudio(index);
  
}

}

  setAudioEvents() {
    this.audioTable.forEach((audio, index) => {
      audio.addEventListener('ended', () => {
        if (index + 1 < this.audioTable.length) {
          if (this.audioMode === 'arfr' && index % 2 === 1) {
            this.currentAyaIndex++;
            this.scrollToAya(this.currentAyaIndex);
          } else if (this.audioMode !== 'arfr') {
            this.currentAyaIndex++;
            this.scrollToAya(this.currentAyaIndex);
          }
          this.audioTable[index + 1].play();
        } else {
          this.isPlayingArabe = false;
          this.isPlayingFrancais = false;
          this.isPlayingArFr = false;
        }
      });
    });
  }

togglePlayPause() {
  if (!this.audioObj) return;

  if (this.audioObj.paused) {
    this.audioObj.play();
    this.updatePlaybackStates();
  } else {
    this.audioObj.pause();
    this.resetPlaybackStates();
  }
}


pauseaya() {
  if (this.audioObj) {
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
  }
  this.resetPlaybackStates();
}


  scrollToAya(index: number) {
    const ayaElement = this.ayaElements?.toArray()[index];
    ayaElement?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.pauseaya();
    this.currentAyaIndex = 0;
    this.currentAudioIndex = 0;
  }

  isAnyPlaying(): boolean {
    return this.isPlayingArabe || this.isPlayingFrancais || this.isPlayingArFr;
  }

  
togglePlayAya(index: number, langue: 'ar' | 'fr') {
  // Si c'est le même verset et même langue, toggle pause/play
  if (this.currentAyaIndex === index && this.audioMode === langue && this.audioObj) {
    if (this.audioObj.paused) {
      this.audioObj.play();
      this.updatePlaybackStates();
    } else {
      this.audioObj.pause();
      this.resetPlaybackStates();
    }
    return;
  }

  // Nouveau verset ou langue => préparer un nouvel audio
  this.cleanAllAudio();
  this.audioMode = langue;
  this.currentAyaIndex = index;

  const aya = this.sourah.ayas[index];
  const audioSrc = langue === 'ar' ? aya.audioAr : aya.audioFr;
  const audio = new Audio(audioSrc);

  this.audioObj = audio;
  this.audioTable = [audio];

  audio.addEventListener('ended', () => this.resetPlaybackStates());

  audio.play();
  this.updatePlaybackStates();
}






  reprendreaya() {
    if (!this.audioTable || this.audioTable.length === 0) {
      return;
    }

    if (this.isPlayingArabe || this.isPlayingFrancais || this.isPlayingArFr) {
      // Si déjà en lecture => pas besoin de relancer
      return;
    }

    if (this.currentLang === 'arabe' || this.currentLang === 'francais') {
      // Cas Arabe ou Français simple
      if (this.audioTable[this.currentAyaIndex]) {
        this.audioTable[this.currentAyaIndex].play();
      }
    } else if (this.currentLang === 'arfr') {
      // Cas Alterné Arabe / Français
      if (this.audioTable[this.currentAudioIndex]) {
        this.audioTable[this.currentAudioIndex].play();
      }
    }
  }

  private cleanAllAudio() {
  this.audioTable.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
    audio.src = '';
  });
  this.audioTable = [];
  this.audioObj = null;
  this.isPlayingArabe = false;
  this.isPlayingFrancais = false;
  this.isPlayingArFr = false;
  this.audioMode = null;
}

private playCurrentAudio(index: number) {
  if (!this.audioTable[index]) return;

  const audio = this.audioTable[index];
  this.audioObj = audio;

  audio.onended = () => {
    const nextIndex = index + 1;
    if (nextIndex < this.audioTable.length) {
      if (this.audioMode === 'arfr') {
        if (nextIndex % 2 === 0) {
          this.currentAyaIndex++;
          this.scrollToAya(this.currentAyaIndex);
        }
      } else {
        this.currentAyaIndex++;
        this.scrollToAya(this.currentAyaIndex);
      }
      this.playCurrentAudio(nextIndex);
    } else {
      this.resetPlaybackStates();
    }
  };

  audio.play();
  this.updatePlaybackStates();
}

private updatePlaybackStates() {
  this.isPlayingArabe = this.audioMode === 'ar';
  this.isPlayingFrancais = this.audioMode === 'fr';
  this.isPlayingArFr = this.audioMode === 'arfr';
}

private resetPlaybackStates() {
  this.isPlayingArabe = false;
  this.isPlayingFrancais = false;
  this.isPlayingArFr = false;
}

private prepareAudioList(mode: 'ar' | 'fr' | 'arfr') {
  this.cleanAllAudio();
  this.audioMode = mode;

  this.sourah.ayas.forEach((aya) => {
    if (mode === 'ar') this.audioTable.push(new Audio(aya.audioAr));
    else if (mode === 'fr') this.audioTable.push(new Audio(aya.audioFr));
    else if (mode === 'arfr') {
      this.audioTable.push(new Audio(aya.audioAr));
      this.audioTable.push(new Audio(aya.audioFr));
    }
  });
}
floatingButtonPosition = {
  position: 'fixed',
  bottom: '200px',
  right: '20px',
  zIndex: 9999
};

private offsetX = 0;
private offsetY = 0;

onDragStart(event: DragEvent) {
  if (event.clientX && event.clientY) {
    this.offsetX = event.clientX;
    this.offsetY = event.clientY;
  }
}

onDragEnd(event: DragEvent) {
  if (event.clientX && event.clientY) {
    const deltaX = event.clientX - this.offsetX;
    const deltaY = event.clientY - this.offsetY;

    const currentRight = parseInt(this.floatingButtonPosition.right.toString(), 10);
    const currentBottom = parseInt(this.floatingButtonPosition.bottom.toString(), 10);

    this.floatingButtonPosition = {
      ...this.floatingButtonPosition,
      right: `${Math.max(currentRight - deltaX, 0)}px`,
      bottom: `${Math.max(currentBottom - deltaY, 0)}px`
    };
  }
}


}
