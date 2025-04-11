let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

// DOM elements 
const input = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn"); 
const changeDue = document.getElementById("change-due");
const drawerDisplay = document.getElementById("drawer");

// Currency unit values in cents
const currencyUnits = {
  "PENNY": 1,
  "NICKEL": 5,
  "DIME": 10,
  "QUARTER": 25,
  "ONE": 100,
  "FIVE": 500,
  "TEN": 1000,
  "TWENTY": 2000,
  "ONE HUNDRED": 10000
};

// Currency unit values for display

const currencyUnitsDisplay = {
    "PENNY": "Pennies",
    "NICKEL": "Nickels",
    "DIME": "Dimes",
    "QUARTER": "Quarters",
    "ONE": "Ones",
    "FIVE": "Fives",
    "TEN": "Tens",
    "TWENTY": "Twenties",
    "ONE HUNDRED": "Hundreds"
}

// Update drawer display
const updateDrawerDisplay = () => {
  const drawerContent = [
    '<p class="center"><strong>Change in drawer:</strong></p>',
    ...cid.map(item => `<p><strong>${currencyUnitsDisplay[item[0]]}:</strong> $${item[1].toFixed(2)}</p>`)
  ].join('');
  drawerDisplay.innerHTML = drawerContent;
}

// Initialize drawer display
updateDrawerDisplay();

// Calculate total cash in drawer
const getTotalCID = () => {
  return cid.reduce((total, [, amount]) => total + amount, 0);
}

// Update CID array with change given
function updateCID(changeBreakdown) {
  // Convert cid to object for easier manipulation
  const cidObj = Object.fromEntries(cid);
  
  // Subtract change given from each denomination
  for (const [unit, amount] of Object.entries(changeBreakdown)) {
    cidObj[unit] = parseFloat((cidObj[unit] - amount).toFixed(2));
  }
  
  // Convert back to array format
  cid = Object.entries(cidObj);
}

// Main function to handle purchase and change calculation
const handlePurchase = () => {
  const cash = parseFloat(input.value);
  
  if (isNaN(cash)) {
    alert("Please enter a valid cash amount");
    input.value = '';
    return;
  }
  
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    input.value = '';
    return;
  }
  
  if (cash === price) {
    changeDue.textContent = "No change due - customer paid with exact cash";
    input.value = '';
    return;
  }
  
  let changeDueAmount = cash - price;
  const totalCID = getTotalCID();
  
  if (totalCID < changeDueAmount) {
    changeDue.innerHTML = `<p><strong>Status:</strong> INSUFFICIENT_FUNDS</p>`;
    input.value = '';
    return;
  }
  
  // Calculate change in cents to avoid floating point precision issues
  let remainingChange = Math.round(changeDueAmount * 100);
  const changeResult = [];
  
  // Create a copy of cid in descending order (highest to lowest denomination)
  const cidCopy = [...cid].reverse();
  const changeBreakdown = {};
  
  for (const [unit, amount] of cidCopy) {
    const unitValue = currencyUnits[unit];
    const totalCents = Math.round(amount * 100);
    let unitCount = Math.floor(totalCents / unitValue);
    let neededUnits = Math.floor(remainingChange / unitValue);
    
    const unitsToUse = Math.min(unitCount, neededUnits);
    const amountUsed = unitsToUse * unitValue;
    
    if (unitsToUse > 0) {
      changeBreakdown[unit] = amountUsed / 100;
      remainingChange -= amountUsed;
    }
    
    if (remainingChange === 0) break;
  }
  
  // Check if exact change could be given
  if (remainingChange > 0) {
    changeDue.innerHTML = `<p><strong>Status:</strong> INSUFFICIENT_FUNDS</p>`;
    input.value = '';
    return;
  }
  
  // Check if we're giving back all the money in the drawer
  if (totalCID === changeDueAmount) {
    // Get all denominations that were actually used in the change
    const usedDenominations = Object.entries(changeBreakdown)
      .sort((a, b) => currencyUnits[b[0]] - currencyUnits[a[0]]); // Sort descending
    
    const closedChange = usedDenominations
      .map(([unit, amount]) => `<p><strong>${unit}:</strong> $${amount.toFixed(2)}</p>`)
      .join(' ');
    
    changeDue.innerHTML = `<p><strong>Status:</strong> CLOSED</p> 
                           <p>${closedChange}</p>`;
    // Update CID and display (all money given as change)
    cid = cid.map(([unit]) => [unit, 0]);
    updateDrawerDisplay();
    input.value = '';
    return;
  }
  
  // Update CID with the change given
  updateCID(changeBreakdown);
  
  // Format the change breakdown for display (highest to lowest)
  const denominationsOrder = [
    "ONE HUNDRED", "TWENTY", "TEN", "FIVE", "ONE",
    "QUARTER", "DIME", "NICKEL", "PENNY"
  ];
  const openChange = denominationsOrder
    .filter(unit => changeBreakdown[unit])
    .map(unit => `<p><strong>${unit}:</strong> $${changeBreakdown[unit].toFixed(2)}</p>`)
    .join(' ');
  
  changeDue.innerHTML = `<p><strong>Status:</strong> OPEN</p>
                           <p>${openChange}</p>`;
  updateDrawerDisplay();
  input.value = '';
}

// Event listeners
purchaseBtn.addEventListener("click", handlePurchase);

// Handle keyboard input for the buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const value = e.target.textContent;
    if (value === 'C') {
      input.value = '';
    } else if (value === '.') {
      if (!input.value.includes('.')) {
        input.value += value;
      }
    } else {
      input.value += value;
    }
  });
});