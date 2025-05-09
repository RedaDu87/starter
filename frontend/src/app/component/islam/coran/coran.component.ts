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
    if (this.audioMode !== 'ar') {
      this.pauseaya();
      this.prepareAudioList('ar');
    }
    this.togglePlayPause();
  }

  playayaFr() {
    if (this.audioMode !== 'fr') {
      this.pauseaya();
      this.prepareAudioList('fr');
    }
    this.togglePlayPause();
  }

  playayaArFr() {
    if (this.audioMode !== 'arfr') {
      this.pauseaya();
      this.prepareAudioList('arfr');
    }
    this.togglePlayPause();
  }

  prepareAudioList(mode: 'ar' | 'fr' | 'arfr') {
    this.audioTable = [];
    this.audioMode = mode;

    this.sourah.ayas.forEach((aya) => {
      if (mode === 'ar') this.audioTable.push(new Audio(aya.audioAr));
      if (mode === 'fr') this.audioTable.push(new Audio(aya.audioFr));
      if (mode === 'arfr') {
        this.audioTable.push(new Audio(aya.audioAr));
        this.audioTable.push(new Audio(aya.audioFr));
      }
    });

    this.setAudioEvents();
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
    if (this.audioTable.length === 0) return;

    const current = this.audioMode === 'arfr' ? this.currentAyaIndex * 2 : this.currentAyaIndex;

    if (this.audioTable[current]?.paused) {
      this.audioTable[current].play();
      this.isPlayingArabe = this.audioMode === 'ar';
      this.isPlayingFrancais = this.audioMode === 'fr';
      this.isPlayingArFr = this.audioMode === 'arfr';
    } else {
      this.audioTable[current]?.pause();
      this.isPlayingArabe = false;
      this.isPlayingFrancais = false;
      this.isPlayingArFr = false;
    }
  }

  pauseaya() {
    this.audioTable.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    this.isPlayingArabe = false;
    this.isPlayingFrancais = false;
    this.isPlayingArFr = false;
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
    // Si c'est le même verset + même langue
    if (this.currentAyaIndex === index && this.audioMode === langue && this.audioTable.length > 0) {
      const currentAudio = this.audioTable[0];
      if (currentAudio.paused) {
        currentAudio.play();
        this.isPlayingArabe = langue === 'ar';
        this.isPlayingFrancais = langue === 'fr';
      } else {
        currentAudio.pause();
        this.isPlayingArabe = false;
        this.isPlayingFrancais = false;
      }
      return;
    }

    // Sinon (nouveau verset ou nouvelle langue)
    this.pauseaya();

    this.currentAyaIndex = index;
    this.audioMode = langue;
    this.audioTable = [];

    const aya = this.sourah.ayas[index];
    let audio: HTMLAudioElement;

    if (langue === 'ar') {
      audio = new Audio(aya.audioAr);
      this.isPlayingArabe = true;
      this.isPlayingFrancais = false;
      this.isPlayingArFr = false;
    } else {
      audio = new Audio(aya.audioFr);
      this.isPlayingFrancais = true;
      this.isPlayingArabe = false;
      this.isPlayingArFr = false;
    }

    this.audioTable.push(audio);

    audio.addEventListener('ended', () => {
      this.isPlayingArabe = false;
      this.isPlayingFrancais = false;
      this.isPlayingArFr = false;
    });

    audio.play();
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

}
