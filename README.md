# SpendWise Pro - Interactive Personal Finance Dashboard

An interactive personal budgeting web application built with HTML5, CSS3, and Vanilla JavaScript. This update transforms SpendWise into a dynamic, event-driven application capable of managing multiple expense records, evaluating budget health in real time, and updating the user interface instantaneously.

## What Improvements Were Made This Week
- **Dynamic Expense Management:** Added an interactive form allowing users to add new expenses with descriptions, categories, and amounts, as well as delete individual items or clear all records.
- **Live Budget Controls:** Added the ability to update the total monthly budget directly from the dashboard.
- **Category Filtering:** Implemented a live category filter dropdown to inspect spending by specific categories.
- **Real-Time Financial Health Indicators:** Replaced static console outputs with live visual KPI cards and dynamic status badges.

## How Conditionals Are Used in the Project
Conditional statements (`if / else if / else`) are used in several areas:
1. **Budget Health Evaluation (`updateDashboardSummary`):** Evaluates whether `remainingBalance < 0` (triggers an Over Budget alert), `spendingPercentage >= 80` (triggers a High Spending warning), `expenses.length === 0` (neutral state), or healthy budget status.
2. **Form & Input Validation:** Checks that expense titles are non-empty strings and monetary amounts/budgets are valid positive numbers before updating application state.
3. **Category Filtering (`renderExpenseList`):** Checks whether each expense matches the selected dropdown category (`filterCategory === "All" || expenses[i].category === filterCategory`).

## How Arrays Are Used to Store Data
Instead of storing expenses in separate variables, all expense records are stored in a centralized array of objects named `expenses`:
```javascript
let expenses = [
    { id: 1, title: "Monthly Apartment Rent", category: "Rent & Housing", amount: 1200.00 },
    // ...
];