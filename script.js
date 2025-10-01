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
              historyArray.unshift(newHistoryEntry);
              const JSONarray = JSON.stringify(historyArray);
              localStorage.setItem('history', JSONarray);
              renderHistory();
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

function loadHistory () {
    const historyHolder = localStorage.getItem('history');
    if(historyHolder){
        historyArray = JSON.parse(historyHolder);
    }
    loadHistory();

}

function renderHistory () {
    historyList.innerHTML = '';
    historyArray.forEach(function(entry){
        const li = document.createElement('li');
        li.textContent = `Price: $${entry.price}, Tip: ${entry.tip}%, People: ${entry.people}, Time: ${entry.timeStamp}`;
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

});