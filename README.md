# **Product Management Dashboard – Angular**

A small Angular application for managing products in an e-commerce catalog.  
**Focus:** clarity, structure, and everyday frontend decision-making.

---

## **Features**

### **Product List**
* **Search** across all products  
* **Column-specific filters**  
* **Sorting** by any column  
* **Pagination** with selectable page size  
* **Filters, sorting, and pagination** persisted in URL parameters  

### **Product Form**
* **Create and edit products**  
* **Reactive Forms** with validation:  
  * Required fields  
  * Minimum values for price and stock  
* **Clear user feedback** for empty states  

### **Routing**
* **Lazy-loaded routes** for:  
  * `/products` – list  
  * `/products/new` – create  
  * `/products/edit/:id` – edit  
* **Layout component** wraps pages consistently  

### **Data & API**
* **ProductService** handles all HTTP communication  
* **Backend** simulated using `json-server`  
* **Strong typing** via TypeScript interfaces (`Product`, `ProductCategory`)  

### **Testing**
* **Partial test coverage**:  
  * Service tests  
  * Form validation tests  
  * Component behavior tests  
* **Note:** Some tests are still in progress  

### **Architecture & Code Quality**
* **Feature-based folder structure**  
* **Clear separation** between UI, services, and data access  
* **RxJS** used for reactive data handling (`BehaviorSubject`, `combineLatest`, `switchMap`)  
* **Readable and maintainable code**, avoiding `any`  
* **Lazy loading** implemented for feature modules  

---

## **Setup & Usage**

To get started with the application, follow these steps:

```bash
# 1. Clone the repository and enter the project folder
git clone <repo-url>
cd product-dashboard

# 2. Install dependencies
npm install

# 3. Start json-server (simulate backend)
npm run json-server

# 4. Start Angular application
ng serve

# 5. Open the application in your browser
# Navigate to:
http://localhost:4200


---

## **Notes**

* **Filters, sorting, and pagination** are synced with the URL, preserving state on reload or when sharing links.  
* Some **unit tests** are incomplete due to time constraints, but main form validations and service interactions are tested.  
* **Future improvements** could include:  
  * Optimistic updates  
  * Caching  
  * Light/Dark theme  
  * Accessibility enhancements

