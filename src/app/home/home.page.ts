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
  [-7.801364253123215, 110.35468214521458], // Barat DIY
  [-7.809452235145213, 110.36621547812312], // Barat Laut DIY
  [-7.821362145784121, 110.37021565485231], // Barat Laut DIY
  [-7.790412365874125, 110.34211563245125], // Barat
  [-7.762125478451236, 110.34865214785421], // Barat DIY
  [-7.742512478451235, 110.35912547851234], // Barat Daya DIY
  [-7.734123145785412, 110.37231458451232], // Selatan DIY
  [-7.755614578512365, 110.40231547851236], // Timur DIY
  [-7.749654215784213, 110.42251247851234], // Timur DIY
  [-7.733245125478123, 110.38965421547854], // Timur DIY
  [-7.772315478521436, 110.39521458963125], // Tengah DIY
  [-7.775412312451325, 110.41121478541234], // Tengah DIY
  [-7.796521478523146, 110.41365214785231], // Utara DIY
  [-7.812354125478523, 110.38712458741521], // Utara DIY
  [-7.814784512364523, 110.35121478541231], // Utara DIY
  [-7.785412578523165, 110.33965214578412], // Barat Laut DIY
  [-7.800125478521354, 110.32451247851234], // Barat Laut DIY
  [-7.790315478521365, 110.31214587451235], // Barat Laut DIY
  [-7.755412478512354, 110.31451247852135], // Barat DIY
  [-7.740125478523165, 110.33124147852145], // Barat Daya DIY
  [-7.721241478523165, 110.35324147852135], // Barat Daya DIY
  [-7.712125478523165, 110.37624147852135], // Selatan DIY
  [-7.732415478523165, 110.39124147852135], // Tengah DIY
  [-7.751241478523165, 110.40451247852135], // Timur Laut DIY
  [-7.782514785241365, 110.41451247852135], // Timur Laut DIY
  [-7.793241478523165, 110.42751247852135], // Utara DIY
  [-7.805241478523165, 110.43751478521436], // Utara DIY
  [-7.819241478523165, 110.44512478521435], // Timur DIY
  [-7.835241478523165, 110.46251478521435], // Timur DIY
  [-7.843241478523165, 110.48912478521435]  // Timur DIY
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
      // Pusat DIY
      [-7.767152750477587, 110.36744095414032],
      [-7.767778747060801, 110.37209750571739],
      [-7.776844000520709, 110.37696465530131],
      [-7.784286172180944, 110.37759644884281],

      // Menuju Utara dan Tengah DIY
      [-7.783322238529062, 110.39044529594334],
      [-7.777952434511191, 110.38665066971738],
      [-7.7858665369587605, 110.37683699864955],
      [-7.796521478523146, 110.41365214785231],
      [-7.812354125478523, 110.38712458741521], // Utara DIY
      [-7.814784512364523, 110.35121478541231], // Utara DIY

      // Menuju Barat DIY
      [-7.801364253123215, 110.35468214521458], // Barat DIY
      [-7.809452235145213, 110.36621547812312], // Barat Laut DIY
      [-7.821362145784121, 110.37021565485231], // Barat Laut DIY
      [-7.790412365874125, 110.34211563245125], // Barat
      [-7.762125478451236, 110.34865214785421], // Barat DIY

      // Menuju Barat Daya DIY
      [-7.742512478451235, 110.35912547851234], // Barat Daya DIY
      [-7.740125478523165, 110.33124147852145], // Barat Daya DIY
      [-7.721241478523165, 110.35324147852135], // Barat Daya DIY

      // Menuju Selatan DIY
      [-7.734123145785412, 110.37231458451232], // Selatan DIY
      [-7.712125478523165, 110.37624147852135], // Selatan DIY

      // Menuju Timur DIY
      [-7.749654215784213, 110.42251247851234], // Timur DIY
      [-7.755614578512365, 110.40231547851236], // Timur DIY
      [-7.733245125478123, 110.38965421547854], // Timur DIY

      // Menuju Timur Laut dan Tengah DIY
      [-7.772315478521436, 110.39521458963125], // Tengah DIY
      [-7.775412312451325, 110.41121478541234], // Tengah DIY
      [-7.751241478523165, 110.40451247852135], // Timur Laut DIY
      [-7.782514785241365, 110.41451247852135], // Timur Laut DIY

      // Menuju Utara DIY
      [-7.793241478523165, 110.42751247852135], // Utara DIY
      [-7.805241478523165, 110.43751478521436], // Utara DIY

      // Menuju Timur DIY
      [-7.819241478523165, 110.44512478521435], // Timur DIY
      [-7.835241478523165, 110.46251478521435], // Timur DIY
      [-7.843241478523165, 110.48912478521435]  // Timur DIY
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
