import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    var product1 = new Product ("1", "Produkt1", "Das ist ein Produkt", 20);
    var product2 = new Product ("2", "Produkt2", "Das ist ein Produkt", 25);
    var product3 = new Product ("3", "Produkt3", "Das ist ein Produkt", 30);
    var product4 = new Product ("4", "Produkt4", "Das ist ein Produkt", 35);
    var product5 = new Product ("5", "Produkt5", "Das ist ein Produkt", 40);
    var product6 = new Product ("6", "Produkt6", "Das ist ein Produkt", 45);

    this.products.push(product1, product2, product3, product4, product5, product6);
    return [...this.products];
  }

  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: string) {
      const index = this.findProduct(prodId)[1];
      this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
