/**
 * =================================================================
 * SpendWise Pro - Interactive Application (v3.0)
 * Author: Ibrahim Abdikadir Dahir
 * Description: Implements Arrays, Loops, Conditionals, DOM Manipulation,
 *              and Event Listeners for dynamic personal finance tracking.
 * =================================================================
 */

// 1. Store Application Data using Variables & Arrays
let monthlyBudget = 5000.00;

// Array of objects storing multiple expense records
let expenses = [
    { id: 1, title: "Monthly Apartment Rent", category: "Rent & Housing", amount: 1200.00 },
    { id: 2, title: "Supermarket Groceries", category: "Food & Dining", amount: 320.50 },
    { id: 3, title: "Electricity & Fiber Internet", category: "Utilities", amount: 185.00 },
    { id: 4, title: "Fuel & City Transit", category: "Transport", amount: 140.20 },
    { id: 5, title: "Cloud Hosting & Streaming", category: "Entertainment", amount: 65.00 }
];

// 2. DOM Element References
const displayBudget = document.getElementById("displayBudget");
const displayTotalExpenses = document.getElementById("displayTotalExpenses");
const displayBalance = document.getElementById("displayBalance");
const expenseCountLabel = document.getElementById("expenseCountLabel");
const healthStatusBadge = document.getElementById("healthStatusBadge");

const expenseForm = document.getElementById("expenseForm");
const expenseTitleInput = document.getElementById("expenseTitle");
const expenseCategoryInput = document.getElementById("expenseCategory");
const expenseAmountInput = document.getElementById("expenseAmount");
const feedbackMessage = document.getElementById("feedbackMessage");

const newBudgetInput = document.getElementById("newBudgetInput");
const updateBudgetBtn = document.getElementById("updateBudgetBtn");
const categoryFilter = document.getElementById("categoryFilter");
const clearAllBtn = document.getElementById("clearAllBtn");
const expenseListContainer = document.getElementById("expenseListContainer");

// 3. Helper Function: Format Currency
function formatCurrency(amount) {
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// 4. Process Data with Loops & Update Summary Dashboard
function updateDashboardSummary() {
    let totalSpent = 0;

    // Loop through the expenses array to calculate total spending
    for (let i = 0; i < expenses.length; i++) {
        totalSpent += expenses[i].amount;
    }

    const remainingBalance = monthlyBudget - totalSpent;
    const spendingPercentage = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 100;

    // Update DOM text values
    displayBudget.textContent = formatCurrency(monthlyBudget);
    displayTotalExpenses.textContent = formatCurrency(totalSpent);
    displayBalance.textContent = formatCurrency(remainingBalance);
    expenseCountLabel.textContent = `${expenses.length} recorded item${expenses.length === 1 ? "" : "s"}`;

    // 5. Implement Decision Making (Conditionals) for Budgeting Scenarios
    if (remainingBalance < 0) {
        healthStatusBadge.textContent = `Over Budget by ${formatCurrency(Math.abs(remainingBalance))}!`;
        healthStatusBadge.className = "status-badge danger";
        displayBalance.className = "text-danger";
    } else if (spendingPercentage >= 80) {
        healthStatusBadge.textContent = `Warning: ${spendingPercentage.toFixed(0)}% of Budget Used`;
        healthStatusBadge.className = "status-badge warning";
        displayBalance.className = "text-warning";
    } else if (expenses.length === 0) {
        healthStatusBadge.textContent = "No Expenses Recorded";
        healthStatusBadge.className = "status-badge neutral";
        displayBalance.className = "";
    } else {
        healthStatusBadge.textContent = `Healthy: ${(100 - spendingPercentage).toFixed(0)}% Budget Remaining`;
        healthStatusBadge.className = "status-badge success";
        displayBalance.className = "text-success";
    }
}

// 6. Render Expense List Dynamically using Loops & DOM Manipulation
function renderExpenseList(filterCategory = "All") {
    // Clear existing DOM content
    expenseListContainer.innerHTML = "";

    // Filter array based on user selection
    const filteredExpenses = [];
    for (let i = 0; i < expenses.length; i++) {
        if (filterCategory === "All" || expenses[i].category === filterCategory) {
            filteredExpenses.push(expenses[i]);
        }
    }

    // Conditional check if list is empty
    if (filteredExpenses.length === 0) {
        expenseListContainer.innerHTML = `<p class="empty-state">No expenses found for "${filterCategory}".</p>`;
        return;
    }

    // Loop through filtered records and build HTML elements dynamically
    filteredExpenses.forEach((item) => {
        const expenseRow = document.createElement("div");
        expenseRow.className = "expense-item";

        expenseRow.innerHTML = `
            <div class="expense-info">
                <strong>${item.title}</strong>
                <span class="category-tag">${item.category}</span>
            </div>
            <div class="expense-actions">
                <span class="expense-amount">${formatCurrency(item.amount)}</span>
                <button class="btn-delete" data-id="${item.id}" title="Delete Expense">✕</button>
            </div>
        `;

        expenseListContainer.appendChild(expenseRow);
    });
}

// Master Refresh Function connecting data processing and UI updates
function refreshApplication() {
    updateDashboardSummary();
    renderExpenseList(categoryFilter.value);
}

// 7. Handle User Interactions via Event Listeners

// Event 1: Add New Expense Form Submission
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    const title = expenseTitleInput.value.trim();
    const category = expenseCategoryInput.value;
    const amount = parseFloat(expenseAmountInput.value);

    // Input Validation using Conditionals
    if (title === "" || isNaN(amount) || amount <= 0) {
        feedbackMessage.textContent = "Please enter a valid description and positive amount.";
        feedbackMessage.className = "feedback-text error";
        return;
    }

    // Add new record to the expenses array
    const newExpense = {
        id: Date.now(),
        title: title,
        category: category,
        amount: amount
    };
    expenses.unshift(newExpense); // Add to top of list

    // Reset form and show confirmation
    expenseForm.reset();
    feedbackMessage.textContent = `Added "${title}" (${formatCurrency(amount)}) to ${category}.`;
    feedbackMessage.className = "feedback-text success";

    refreshApplication();
});

// Event 2: Delete Individual Expense (Event Delegation)
expenseListContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-delete")) {
        const idToDelete = Number(event.target.getAttribute("data-id"));
        
        // Rebuild array excluding the deleted item
        expenses = expenses.filter((item) => item.id !== idToDelete);
        
        feedbackMessage.textContent = "Expense item removed.";
        feedbackMessage.className = "feedback-text";
        refreshApplication();
    }
});

// Event 3: Update Monthly Budget
updateBudgetBtn.addEventListener("click", function () {
    const updatedValue = parseFloat(newBudgetInput.value);

    if (!isNaN(updatedValue) && updatedValue > 0) {
        monthlyBudget = updatedValue;
        newBudgetInput.value = "";
        feedbackMessage.textContent = `Monthly budget updated to ${formatCurrency(monthlyBudget)}.`;
        feedbackMessage.className = "feedback-text success";
        refreshApplication();
    } else {
        feedbackMessage.textContent = "Please enter a valid budget amount greater than 0.";
        feedbackMessage.className = "feedback-text error";
    }
});

// Event 4: Filter Expenses by Category
categoryFilter.addEventListener("change", function () {
    renderExpenseList(categoryFilter.value);
});

// Event 5: Clear All Expenses
clearAllBtn.addEventListener("click", function () {
    if (expenses.length > 0) {
        expenses = [];
        feedbackMessage.textContent = "All expense records cleared.";
        feedbackMessage.className = "feedback-text";
        refreshApplication();
    }
});

// Initialize Dashboard on Page Load
document.addEventListener("DOMContentLoaded", refreshApplication);