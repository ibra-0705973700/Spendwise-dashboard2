/**
 * =================================================================
 * SpendWise Pro - JavaScript Foundation (Week 6)
 * Author: Ibrahim A. (PLP Software Engineering Scholar)
 * Description: Core logic handling data storage, user inputs, 
 *              budget calculations, reusable functions, and console logging.
 * =================================================================
 */

// 1. Store Application Data using Constants and Variables
const appConfig = {
    appName: "SpendWise Dashboard",
    version: "2.0.0",
    currency: "$"
};

let userProfile = {
    fullName: "Ibrahim Abdikadir Dahir",
    monthlyBudget: 5000,
    totalExpenses: 1845.70,
    savingsGoal: 2000
};

// Category-specific expense records
let expenseCategories = [
    { category: "Food & Dining", amount: 450.00, type: "Expense" },
    { category: "Transport", amount: 180.50, type: "Expense" },
    { category: "Rent & Housing", amount: 1200.00, type: "Expense" },
    { category: "Entertainment", amount: 95.00, type: "Expense" },
    { category: "Savings", amount: 3400.00, type: "Goal" },
    { category: "Utilities", amount: 210.20, type: "Bills" }
];

// 2. Reusable Functions for Calculations & Logic

/**
 * Calculates the remaining balance.
 * @param {number} budget - Total available budget
 * @param {number} expenses - Total spent amount
 * @returns {number} The calculated remaining balance
 */
function calculateRemainingBalance(budget, expenses) {
    return budget - expenses;
}

/**
 * Formats any numeric value into currency format.
 * @param {number} amount - The numeric amount
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
    return `${appConfig.currency}${amount.toFixed(2)}`;
}

/**
 * Evaluates financial health status based on remaining balance.
 * @param {number} balance - Current remaining balance
 * @returns {string} Status message
 */
function evaluateFinancialHealth(balance) {
    if (balance < 0) {
        return "Deficit - Over Budget!";
    } else if (balance < 500) {
        return "Warning - Low Balance";
    } else {
        return "Healthy - On Track";
    }
}

// 3. Interactive Prompt Function (Fulfills prompt requirement)
function collectUserPromptInput() {
    console.log("--- Interactive Prompt Triggered ---");
    let inputBudget = prompt("Enter your new Monthly Budget ($):", userProfile.monthlyBudget);
    let inputExpenses = prompt("Enter your total Expenses ($):", userProfile.totalExpenses);

    if (inputBudget !== null && inputExpenses !== null) {
        let parsedBudget = parseFloat(inputBudget);
        let parsedExpenses = parseFloat(inputExpenses);

        if (!isNaN(parsedBudget) && !isNaN(parsedExpenses)) {
            userProfile.monthlyBudget = parsedBudget;
            userProfile.totalExpenses = parsedExpenses;
            
            console.log(`Updated via Prompt -> Budget: ${formatCurrency(parsedBudget)}, Expenses: ${formatCurrency(parsedExpenses)}`);
            processAndDisplayResults();
        } else {
            console.warn("Invalid input detected. Please enter valid numbers.");
        }
    }
}

// 4. Core Processing & Console Logging Function
function processAndDisplayResults() {
    console.group(`=== ${appConfig.appName} v${appConfig.version} - Financial Report ===`);
    console.log(`User: ${userProfile.fullName}`);
    console.log(`Monthly Budget: ${formatCurrency(userProfile.monthlyBudget)}`);
    console.log(`Total Expenses: ${formatCurrency(userProfile.totalExpenses)}`);

    let remaining = calculateRemainingBalance(userProfile.monthlyBudget, userProfile.totalExpenses);
    let healthStatus = evaluateFinancialHealth(remaining);

    console.log(`Calculated Remaining Balance: ${formatCurrency(remaining)}`);
    console.log(`Financial Health Status: ${healthStatus}`);
    console.groupEnd();

    updateUIElements(remaining, healthStatus);
}

// 5. DOM Manipulation & UI Feedback
function updateUIElements(balance, status) {
    const balanceOutput = document.getElementById("balanceOutput");
    const statusMessage = document.getElementById("statusMessage");

    if (balanceOutput && statusMessage) {
        balanceOutput.textContent = formatCurrency(balance);
        statusMessage.textContent = status;
        
        if (balance < 0) {
            statusMessage.className = "status-badge danger";
        } else if (balance < 500) {
            statusMessage.className = "status-badge warning";
        } else {
            statusMessage.className = "status-badge success";
        }
    }
}

// Event Listeners on DOM Load
document.addEventListener("DOMContentLoaded", () => {
    console.log("SpendWise JavaScript initialized successfully.");
    processAndDisplayResults();

    const calcBtn = document.getElementById("calculateBtn");
    if (calcBtn) {
        calcBtn.addEventListener("click", () => {
            const bInput = document.getElementById("monthlyBudget").value;
            const eInput = document.getElementById("totalExpenses").value;
            
            userProfile.monthlyBudget = parseFloat(bInput) || 0;
            userProfile.totalExpenses = parseFloat(eInput) || 0;

            processAndDisplayResults();
        });
    }
});