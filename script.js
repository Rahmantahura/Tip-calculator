document.addEventListener('DOMContentLoaded', function(){
    const priceValue = document.querySelector('#price-input');
    const tipValue = document.querySelector('#tip-input');
    const peopleValue = document.querySelector('#people-input');
    const calculateButton = document.querySelector('.calculate-btn');
    const resetButton = document.querySelector('.reset-btn');
    const tipValueDisplay = document.querySelector('.tip-display .result-value');
    const totalBillValueDisplay = document.querySelector('.total-amount-display .result-value');
    const tipPerPersonValueDisplay = document.querySelector('.tip-per-person-display .result-value');
    const totalPerPersonValueDisplay = document.querySelector('.total-per-person-display .result-value');
    const historyList = document.querySelector('.history-list');
    const clearHistoryButton = document.querySelector('.clear-history-btn');
    const tipTableBody = document.querySelector('#tip-table tbody');



    calculateButton.addEventListener('click', function(Event){
        Event.preventDefault();
        performCalculation();
});

    document.addEventListener('keydown', function(event){
        if(event.key === 'Enter'){
        performCalculation();
    }
});

    resetButton.addEventListener('click', function(){
        resetDisplay();
    });

    clearHistoryButton.addEventListener('click', function(){
        clearHistory();
    });

function performCalculation() {
        const price = parseFloat(priceValue.value);
        const tip = parseFloat(tipValue.value) / 100;
        const people = parseInt(peopleValue.value);

        // preventing invalid input

        if (isNaN(price) || isNaN(tip) || isNaN(people) ||price <=0 || people <= 0) {
            alert('Please enter valid numerical values for price, tip, and people.');
            resetDisplay();
            return;
        }

        // Actual calculatoin logic

        const tipAmount = price * tip;
        const totalBill = price + tipAmount;
        const tipPerPerson = tipAmount / people;
        const perPerson = totalBill / people;

        //display logic

        tipValueDisplay.textContent = `$${tipAmount.toFixed(2)}`;
        totalBillValueDisplay.textContent = `$${totalBill.toFixed(2)}`;
        tipPerPersonValueDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalPerPersonValueDisplay.textContent = `$${perPerson.toFixed(2)}`;

        const newHistoryEntry = {
            price: price,
            tip: tip * 100,
            people: people,
            timeStamp: new Date().toLocaleTimeString()
        }
             // History functionality
              historyArray = [newHistoryEntry, ...historyArray]; 
              const JSONarray = JSON.stringify(historyArray);
              localStorage.setItem('history', JSONarray);
              renderHistory();

              generateTipTable(price, people);
        }

       // reset logic

function resetDisplay (){
    priceValue.value = 0;
    tipValue.value = 0;
    peopleValue.value = 0;
    tipValueDisplay.textContent = '$0.00';
    totalBillValueDisplay.textContent = '$0.00';
    tipPerPersonValueDisplay.textContent = '$0.00';
    totalPerPersonValueDisplay.textContent = '$0.00';
}

let historyArray = [];
loadHistory();

function loadHistory () {
    const historyHolder = localStorage.getItem('history');
    if(historyHolder){
        historyArray = JSON.parse(historyHolder);
    }
    renderHistory();
    filterHighTips();
    getGrandTotal();
    logHistoryKeys();
}

function renderHistory () {
    historyList.innerHTML = '';
    historyArray.forEach(function(entry){
        const { price, tip, people, timeStamp } = entry;
        const li = document.createElement('li');
        li.textContent = `Price: $${price}, Tip: ${tip}%, People: ${people}, Time: ${timeStamp}`;
        historyList.appendChild(li);
    });
    if(historyArray.length === 0){
        historyList.textContent = 'No previous calculations found.';
    }
}

function clearHistory () {
    localStorage.removeItem('history');
    historyArray = [];
    renderHistory();
}

function generateTipTable(bill, diners) {
    tipTableBody.innerHTML = '';
   for(let i = 10; i < 21; i++){
    const currentTip = i / 100;
        const tipAmount = bill * currentTip;
        const totalBill = bill + tipAmount;

        // 2. Create the HTML Row (Template Literal)
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${i}%</td>
            <td>$${tipAmount.toFixed(2)}</td>
            <td>$${totalBill.toFixed(2)}</td>
        `;
        tipTableBody.appendChild(newRow);
   }
}

function filterHighTips(){
    const highTipHistory = historyArray.filter(entry => entry.tip > 15);
    // console.log("History with Tips > 15%:", highTipHistory);
}

function getGrandTotal() {
    const totalBillPerEntry = historyArray.map(entry => {
        return entry.price + entry.price * entry.tip / 100;
    });

    const grandTotal = totalBillPerEntry.reduce((sum, bill) => {
        return sum + bill; 
    }, 0); // Start the sum at 0

    // console.log("Array of Total Bills (via Map):", totalBillPerEntry);
    // console.log("Grand Total of All Calculated Bills (via Reduce):", grandTotal.toFixed(2));
}

function logHistoryKeys() {
    if (historyArray.length === 0) {
        console.log("No history data found.");
        return;
    }
    const firstEntry = historyArray[0];
    const keys = Object.keys(firstEntry);

    // console.log("Keys in history array:", keys);
}

function fetchQuote() {
    fetch('https://type.fit/api/quotes')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log("--- Inspirational Quote ---");
        console.log(`Quote: "${data[0].text}"`);
        console.log(`Author: ${data[0].author}`);
        console.log("---------------------------");
    })
    .catch(error => {
        console.error('Error fetching quote:', error);
    });
}

fetchQuote();
});