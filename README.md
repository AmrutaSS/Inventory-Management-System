# Inventory Management System
This is an Inventory Management System built with Node.js. It allows you to manage products, warehouses, stocks, and process orders.

## Prerequisites
Node.js and npm (Node Package Manager) should be installed on your system.

## Installation
1. Clone the repository: https://github.com/AmrutaSS/Inventory-Management-System.git

2. Navigate to the project directory:
cd inventory-management

3. Install the dependencies:
npm install

## Usage
1. Start the application:  
nodemon index.js

2. You will see a command prompt:
Enter a command:

3. Enter commands based on the available options. Here are some example commands:

    * Add a product to the catalog :
        ADD PRODUCT "Product 1" 1001 "Category 1" "Sub-category 1"

    * Add a warehouse :
        ADD WAREHOUSE W100001 "Warehouse 1" "State 1" "(40.7128,-74.0060)"

    * Add stock to a warehouse :
        ADD STOCK 1001 W100001 50

    * Add a state :
        ADD STATE "California"

    * Viewing states :
        VIEW STATE

    * Viewing orders :
        VIEW ORDERS

    * Listing products :
        LIST PRODUCTS

    * Listing warehouses :
        LIST WAREHOUSES

    * Warehouse information :
        WAREHOUSE INFO W100001

    * Exit the application :
        EXIT

4. Follow the prompts and enter the required information for each command.

## Acknowledgements
This project was inspired by the need for a simple and flexible inventory management system.