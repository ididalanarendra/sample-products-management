import { Component, OnInit } from '@angular/core';
import {IProduct} from './product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from './product.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Details';
  product: IProduct;
  result: IProduct[];
  Products: IProduct[];
  constructor(private route: ActivatedRoute, private router: Router, private  productService: ProductService) {
    this.Products = productService.products;
  }
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;

    this.result = this.Products.filter(i => {
      return i.productId === id;
    });
    this.product = this.result[0];
    console.log(this.product);
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
