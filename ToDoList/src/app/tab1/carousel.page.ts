import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
})
export class CarouselComponent {
  carouselTexts = [
    { title: "Vítejte!", content: "Zde můžete přidat nový úkol." },
    { title: "Jak používat aplikaci?", content: "Swipe doprava pro označení úkolu jako hotového." },
    { title: "Tip!", content: "Klepnutím na hvězdu označíte úkol jako oblíbený." },
    { title: "Filtrování", content: "Použijte filtry pro snadné vyhledávání úkolů." }
  ];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000, // Automatická změna každé 3 sekundy
      disableOnInteraction: false
    },
    loop: true
  };

  constructor() {}
}
