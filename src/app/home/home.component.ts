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
  selectedCategory: { [key: string]: boolean } = {};
  searchKeyword = '';
  showAll = false;
  showText = 'Show More';
  totalProducts: number = 0;
  productSub!: Subscription;
  selectedSortOption = 'nameAsc';

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
        // console.table(this.products);
        this.filteredProducts = this.products.slice(0, 8); 
        this.categories = [...new Set(this.products.map(product => product.category))];
        this.categories.forEach(category => this.selectedCategory[category] = false);
      }
    });
  }

  expandList(): void {
    if (!this.showAll) {
      this.showAll = true;
      this.showText = 'Show Less'
      this.filteredProducts = [...this.products];
    } else {
      this.showAll = false;
      this.showText = 'Show More'
      this.filteredProducts = this.products.slice(0, 8);
    }
  }
  
  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
        product.price.toString().includes(this.searchKeyword)
      )
      .filter(product => this.selectedCategory[product.category] || 
        Object.values(this.selectedCategory).every(value => !value)
      );

    if (!this.showAll) {
      this.filteredProducts = this.filteredProducts.slice(0, 8);
    }
  }

  sortProducts(): void {
    console.log(this.selectedSortOption);
    switch (this.selectedSortOption) {
      case 'nameAsc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'priceAsc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'categoryAsc':
        this.filteredProducts.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
    }
  }
}
