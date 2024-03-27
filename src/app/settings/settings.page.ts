import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  isCelsiusSelected: boolean = true;
  constructor(private settings:SettingsService) { }

  ngOnInit() {
    this.settings.tipoTemperatura$.subscribe((tipo) => {
      this.isCelsiusSelected = tipo;
    })
  }


  selectCelsius() {
    this.isCelsiusSelected = true;
    this.settings.setTemperatura(this.isCelsiusSelected);
  }

  selectFahrenheit() {
    this.isCelsiusSelected = false;
    this.settings.setTemperatura(this.isCelsiusSelected);
  }

}
