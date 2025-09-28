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
}

function resetDisplay (){
    priceValue.value = 0;
    tipValue.value = 0;
    peopleValue.value = 0;
    tipValueDisplay.textContent = '$0.00';
    totalBillValueDisplay.textContent = '$0.00';
    tipPerPersonValueDisplay.textContent = '$0.00';
    totalPerPersonValueDisplay.textContent = '$0.00';
}
});