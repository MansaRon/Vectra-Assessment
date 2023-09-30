import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from '../service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  products!: Product[];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory = '';
  searchKeyword = '';
  showAll = false;
  totalProducts: number = 0;
  productSub!: Subscription;

  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

  loadProducts() {
    this.productSub = this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.totalProducts = this.products.length;
        console.table(this.products);
        this.filteredProducts = this.products.slice(0, 8); 
        this.categories = [...new Set(this.products.map(product => product.category))];
      }
    })
  }

  expandList(): void {
    this.showAll = true;
    this.filteredProducts = [...this.products];
  }
  
}
