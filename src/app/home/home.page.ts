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
      iconSize: [20, 20], // Ukuran icon yang lebih kecil
      iconAnchor: [10, 20], // Titik anchor menyesuaikan dengan ukuran icon
    });

    // Add markers without popup
    const markerCoordinates: [number, number][] = [
      [-7.767152750477587, 110.36744095414032],
      [-7.767778747060801, 110.37209750571739],
      [-7.776844000520709, 110.37696465530131],
      [-7.784286172180944, 110.37759644884281],
      [-7.783322238529062, 110.39044529594334],
      [-7.777952434511191, 110.38665066971738],
      [-7.7858665369587605, 110.37683699864955],
      [-7.783780179741857, 110.37722138984564]
    ];

    // Loop through the array and add each marker to the map
    markerCoordinates.forEach(coords => {
      L.marker(coords, { icon: customIcon }).addTo(this.map);
    });

    // Add popup when the page is first loaded
    const welcomePopup = L.popup({
      closeOnClick: true, // Close the popup when clicking outside
      autoClose: true,    // Automatically close when another popup is opened
    })
    .setLatLng([-7.7907845411639185, 110.37151632967743]) // Set the location for the popup
    .setContent("<b>Selamat datang di Ambulanmu!</b><br>Kami siap menjemputmu.") // Set the content of the popup
    .openOn(this.map); // Open the popup on the map

    // Define ambulance route coordinates
    const ambulanceRoute: [number, number][] = [
      [-7.7907845411639185, 110.37151632967743],
      [-7.784286172180944, 110.37759644884281],
      [-7.776844000520709, 110.37696465530131],
      [-7.767778747060801, 110.37209750571739],
      [-7.767152750477587, 110.36744095414032]
    ];

    // Add ambulance route to the map as a polyline
    const routePolyline = L.polyline(ambulanceRoute, { color: 'blue', weight: 4, opacity: 0.7 });
    routePolyline.addTo(this.map);

    // Fit the map to the bounds of the route
    this.map.fitBounds(routePolyline.getBounds());
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
