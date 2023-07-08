const readline = require('readline');
const fs = require('fs');

let productCatalog = [];
let warehouses = [];
let states = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addProduct(productName, skuId, category, subCategory, imageLink) {
  const product = {
    productName,
    skuId,
    category,
    subCategory,
    imageLink
  };
  productCatalog.push(product);
  console.log('Product added successfully!');
}

function addWarehouse(warehouseNum, warehouseName, state, location, stockLimit) {
  const warehouse = {
    warehouseNum,
    warehouseName,
    state,
    location,
    stockLimit
  };
  warehouses.push(warehouse);
  console.log('Warehouse added successfully!');
}

function addStock(sku, warehouseNum, qty) {
  const warehouse = warehouses.find(wh => wh.warehouseNum === warehouseNum);

  if (!warehouse) {
    console.log('Warehouse not found!');
    return;
  }

  const stockLimit = warehouse.stockLimit;
  const currentStock = warehouse.stock || 0;
  const availableSpace = stockLimit ? stockLimit - currentStock : Infinity;
  const addedQty = Math.min(qty, availableSpace);
  const remainingQty = qty - addedQty;

  if (stockLimit && remainingQty > 0) {
    console.log('Warning: Stock limit exceeded. Shipped maximum available quantity.');
  }

  warehouse.stock = currentStock + addedQty;
  console.log(`Stock added successfully. Current stock for SKU ${sku} in warehouse ${warehouseNum}: ${warehouse.stock}`);

  if (remainingQty > 0) {
    console.log(`Remaining quantity: ${remainingQty}`);
    // Implement logic to fulfill remaining quantity from other warehouses if available
  }
}

function addState(state) {
  const stateCode = state.substring(0, 2).toUpperCase();
  states.push({ state, stateCode });
  console.log('State added successfully!');
}

function viewStates() {
  console.log('States:');
  states.forEach(state => {
    const warehousesInState = warehouses.filter(wh => wh.state === state.state).length;
    const totalStockCapacity = warehouses.reduce((total, wh) => total + (wh.stockLimit || Infinity), 0);
    console.log(`State: ${state.state} (${state.stateCode})`);
    console.log(`Number of Warehouses: ${warehousesInState}`);
    console.log(`Total Stock Capacity: ${totalStockCapacity}`);
    console.log('----------------------');
  });
}


function getAllOrders() {
  // Placeholder implementation to return sample orders
  return [
    {
      id: 1,
      customer: {
        id: 1,
        name: 'John Doe'
      },
      product: {
        sku: 1001,
        name: 'Product 1'
      },
      quantity: 10,
      warehouse: {
        warehouseNum: 'W100001',
        name: 'Warehouse 1'
      },
      status: 'Processed'
    },
    {
      id: 2,
      customer: {
        id: 2,
        name: 'Jane Smith'
      },
      product: {
        sku: 1002,
        name: 'Product 2'
      },
      quantity: 5,
      warehouse: {
        warehouseNum: 'W100002',
        name: 'Warehouse 2'
      },
      status: 'Pending'
    }
  ];
}


function viewOrders() {
  const orders = getAllOrders();

  console.log('Orders:');
  orders.forEach(order => {
    console.log(`Order ID: ${order.id}`);
    console.log(`Customer ID: ${order.customer.id}`);
    console.log(`Product SKU: ${order.product.sku}`);
    console.log(`Quantity: ${order.quantity}`);
    console.log(`Warehouse: ${order.warehouse.warehouseNum}`);
    console.log(`Status: ${order.status}`);
    console.log('----------------------');
  });
}


function listProducts() {
  console.log('Product Catalog:');
  productCatalog.forEach(product => {
    const stockWarehouses = warehouses.filter(wh => wh.stock && wh.stock.find(s => s.sku === product.skuId));
    console.log(`Product Name: ${product.productName}`);
    console.log(`SKU ID: ${product.skuId}`);
    console.log(`Current Stock Quantity: ${stockWarehouses.length}`);
    console.log('In Stock Warehouses:');
    stockWarehouses.forEach(wh => {
      console.log(`- Warehouse ${wh.warehouseNum}`);
    });
    console.log('----------------------');
  });
}

function listWarehouses() {
  console.log('Warehouses:');
  warehouses.forEach(warehouse => {
    console.log(`Warehouse#: ${warehouse.warehouseNum}`);
    console.log(`Warehouse Name: ${warehouse.warehouseName}`);
    console.log(`State: ${warehouse.state}`);
    console.log(`Location: ${warehouse.location}`);
    console.log('----------------------');
  });
}

function warehouseInfo(warehouseNum) {
  const warehouse = warehouses.find(wh => wh.warehouseNum === warehouseNum);
  if (!warehouse) {
    console.log('Warehouse not found!');
    return;
  }

  const skusInWarehouse = productCatalog.filter(prod => warehouse.stock && warehouse.stock.find(s => s.sku === prod.skuId));
  console.log(`Warehouse#: ${warehouse.warehouseNum}`);
  console.log(`Warehouse ID: ${warehouse.id}`);
  console.log(`Available Storage: ${warehouse.stockLimit !== undefined ? warehouse.stockLimit : -1}`);
  console.log('Available SKUs:');
  skusInWarehouse.forEach(prod => {
    console.log(`- SKU: ${prod.skuId}`);
  });
}

function processCommand(command) {
  const args = command.trim().split(' ');
  const commandType = args.shift().toUpperCase();

  switch (commandType) {
    case 'ADD':
      const addCommand = args.shift().toUpperCase();
      if (addCommand === 'PRODUCT') {
        const productName = args.shift();
        const skuId = parseInt(args.shift());
        const category = args.shift();
        const subCategory = args.shift();
        const imageLink = args.shift();
        addProduct(productName, skuId, category, subCategory, imageLink);
      } else if (addCommand === 'WAREHOUSE') {
        const warehouseNum = args.shift();
        const warehouseName = args.shift();
        const state = args.shift();
        const location = args.shift();
        const stockLimit = args.shift();
        addWarehouse(warehouseNum, warehouseName, state, location, stockLimit);
      } else if (addCommand === 'STOCK') {
        const sku = parseInt(args.shift());
        const warehouseNum = args.shift();
        const qty = parseInt(args.shift());
        addStock(sku, warehouseNum, qty);
      } else if (addCommand === 'STATE') {
        const state = args.shift();
        addState(state);
      } else {
        console.log('Invalid command!');
      }
      break;
    case 'VIEW':
      const viewCommand = args.shift().toUpperCase();
      if (viewCommand === 'STATE') {
        viewStates();
      } else if (viewCommand === 'ORDERS') {
        viewOrders();
      } else {
        console.log('Invalid command!');
      }
      break;
    case 'LIST':
      const listCommand = args.shift().toUpperCase();
      if (listCommand === 'PRODUCTS') {
        listProducts();
      } else if (listCommand === 'WAREHOUSES') {
        listWarehouses();
      } else {
        console.log('Invalid command!');
      }
      break;
    case 'WAREHOUSE':
      const warehouseCommand = args.shift().toUpperCase();
      if (warehouseCommand === 'INFO') {
        const warehouseNum = args.shift();
        warehouseInfo(warehouseNum);
      } else {
        console.log('Invalid command!');
    }
      break;
    case 'EXIT':
      rl.close();
      break;
    default:
      console.log('Invalid command!');
      break;
  }
}

function startREPL() {
  rl.question('Enter a command: ', command => {
    processCommand(command);
    startREPL();
  });
}

startREPL();
