import { Component, OnInit } from '@angular/core';
import { CartService, ShippingFee } from '../service/cart.service';
import { of, interval, zip, combineLatest, Subject, from } from 'rxjs';
import { tap, map, filter, take, share } from 'rxjs/operators';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  shippingCosts;
  constructor(
    private cartService: CartService
  ) {
    this.items = this.cartService.getItems();
  }

  ngOnInit() {
  }

  getShippingFee() {
    // this.shippingCosts = this.cartService.getShippingFee();
    this.cartService.getShippingFee().subscribe((data: Array<ShippingFee>) => this.shippingCosts = data);

    this.cartService.getShippingFeeResponse().subscribe((resp) => {
      console.log(resp);
    });

    this.cartService.getTextFile('../../assets/test.txt').subscribe((data) => {
      console.log(data);
    });

    /******************** */
    const cities = ['Varanasi', 'Mathura', 'Ayodhya'];
    of(cities).pipe(
      tap(c => console.log(c)),
      map(dataArray => {
        console.log(dataArray);
        return dataArray.join(', ');
      }),
      // map(x => x + '-')
    ).subscribe(res => console.log(res));

    from(cities).pipe(
      map(x => x + '-')
    ).subscribe(res => console.log(res));


    /******************** */
    of(1, 2, 3, 4).pipe(
      tap(el => console.log('Process ' + el),
          err => console.error(err),
          () => console.log('Complete')
      ),
      filter(n => n % 2 === 0)
   ).subscribe(el => console.log('Even number: ' + el));


    /******************** */
    const source11 = interval(1000).pipe(take(3));
    const source22 = interval(3000).pipe(take(3));
    const example1 = zip(source11, source22);
    example1.subscribe({
      next: ([a, b]) => {
        console.log(a, b);
      },
      error: err => {
        console.log('Error: ' + err);
      },
      complete: () => {
        console.log('complete');
      }
    });
    // zip(of(2,3),of(3,4)).subscribe(([a,b])=>console.log(a+'-'+b)) 

    let [a, b] = [1, 2];
    console.log(a, b);


    /******************** */
    // 创建一个Observable，一秒钟输出一个数字，只取三个就结束
    const source = interval(1000).pipe(take(3));

      // 定义两个observer对象
    const observerA = {
        next: value => console.log('A next: ' + value),
        error: error => console.log('A error: ' + error),
        complete: () => console.log('A complete!')
    };

    const observerB = {
        next: value => console.log('B next: ' + value),
        error: error => console.log('B error: ' + error),
        complete: () => console.log('B complete!')
    };

    // 创建一个subject —— 特殊的Observable
    const subject = new Subject();

    // observerA订阅Subject
    subject.subscribe(observerA);

    // Subject又以observer的身份订阅Observable
    source.subscribe(subject);

    setTimeout(() => {
        subject.subscribe(observerB);
    }, 1000);


    /******************** */
    const numbers = interval(1000).pipe(take(5), share());

    function subscribeToNumbers(name) {
        numbers.subscribe(
            x => console.log(`${name}: ${x}`)
        );
    }

    subscribeToNumbers('Dave');

    const anotherSubscription = () => subscribeToNumbers('Nick');

    setTimeout(anotherSubscription, 2500);
  }

}
