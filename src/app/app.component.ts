import { Component } from '@angular/core';
import { sharedStylesheetJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  products = [
    {name: 'Phone XL', price: 750, desc: 'Phone XL Phone XL Phone XL description'},
    {name: 'Phone mini', price: 20},
    {name: 'Phone standard', price: 700}
  ];

  share(id) {
    alert('商品id：' + id);
  }

  onNotify() {
    alert('notify');
  }
}
