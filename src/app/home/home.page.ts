import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;
  selectedBasemap: string = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'; // Default basemap
  basemaps: { name: string, url: string, attribution: string }[] = [
    { name: 'OpenStreetMap', url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' },
    { name: 'CartoDB Positron', url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>' },
    { name: 'OpenTopoMap', url: 'https://tile.opentopomap.org/{z}/{x}/{y}.png', attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors' },
    { name: 'CartoDB Dark Matter', url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>' },
    { name: 'Esri Light Gray Canvas', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a>' },
    { name: 'Esri World Street Map', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', attribution: '&copy; <a href="https://www.esri.com/en-us/home">Esri</a>' }
  ];

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.map = L.map('mapId').setView([-7.7907845411639185, 110.37151632967743], 10);
    L.tileLayer(this.selectedBasemap, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Create custom icon with smaller size
    const customIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/128/1032/1032989.png',
      iconSize: [25, 25], // Ukuran icon yang lebih kecil
      iconAnchor: [10, 20], // Titik anchor menyesuaikan dengan ukuran icon
    });

    // Add marker without popup
    L.marker([-7.782392945431321, 110.36689876089457], { icon: customIcon })
      .addTo(this.map);
  }

  changeBasemap() {
    // Remove the existing layer
    this.map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        this.map.removeLayer(layer);
      }
    });

    // Add the selected basemap layer
    const basemapLayer = L.tileLayer(this.selectedBasemap, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    basemapLayer.addTo(this.map);
  }

}
