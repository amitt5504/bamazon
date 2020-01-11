# bamazon

BAamzon is a mock version of Amazon that can be used by customers to purchase products, managers to check and add inventory and supervisors to check profits of all sales

BAmazon Customer

When running the `bamazonCustomer.js` file, the customer is displayed the options to either view the products for sale or exit.
!["customer-menu"](https://i.imgur.com/wPsMV2g.png)

If you select view items, the available items will display. 
!["customer-items"](https://i.imgur.com/4YhCQVT.png)

Enter in the item # from the list the select the item to purchase. Then enter the quantity to purchase. If the remaining stock is less than the quantity requested, the order will not process and the user must select again.
!["customer-order"](https://i.imgur.com/ab3eBZ6.png)

Once the order has been placed, the user has the option to create a new order or exit.

BAmazon Managers

When running the `bamazonManager.js` file, the manager is displayed the options to view available products, view the items with low inventory, add to inventory or add a new product.
!["manager-menu"](https://i.imgur.com/p8c6J4l.png)

View Products for Sale displays all items and the current inventory
!["manager-inventory"](https://i.imgur.com/bYbT7F3.png)

View Low Inventory displays all items with an inventory count of less than 5
!["manager-low"](https://i.imgur.com/mgDTvyR.png)

Add to inventory prompts for item id to increase inventory on and quantity to increase inventory
!["manager-increase"](https://i.imgur.com/eYi51a2.png)

Add new product, prompts for item name, department, price, and quantity in stock
!["manager-add"](https://i.imgur.com/OVOkL4A.png)

BAmazon Supervisors
When running the `bamazonSupervisor.js` file, the supervisor is displayed the options to view department overhead, add a new department.
!["supervisor-menu"](https://i.imgur.com/R5qBkzF.png)

Selecting View Product Sales by Department displays the total sales by department and current profit values
!["supervisor-overhead"](https://i.imgur.com/Osqbzih.png)

If you select create new department, follow the prompts for department name and overhead costs.
!["supervisor-department"](https://i.imgur.com/bwuIPOb.png)

