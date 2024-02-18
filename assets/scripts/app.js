// Common Functions Starts Here
function elementById(elementId){
    const element = document.getElementById(elementId);
    return element;
}
function elementsByClassName(className){
    const elements = document.getElementsByClassName(className);
    return elements;
}
function elementByQuerySelector(element){
    const theElement = document.querySelector(element);
    return theElement;
}
function textToInteger(element){
    return parseInt(element.innerText)
}
function getInnerText(element){
    const innerTextOfAnElement = element.innerText;
    return innerTextOfAnElement;
}
function setInnerText(element, value){
    element.innerText = value;
}
function remainingSeat(theTotalSeat, totalSelectedSeat){
    return theTotalSeat - totalSelectedSeat;
}
function createAnHtmlElement(element){
    return document.createElement(element);
}
function appendContent(place, item){
    return place.appendChild(item);
}
function validatePassengerNumber(inputFieldValue) {
    if (!regex.test(inputFieldValue)) {
        return false;
    } else {
        return true;
    }
}
function enableNextButton() {
    if (validatePassengerNumber(passengerNumber) && (selectedSeat > 0)) {
        nextButtonElement.removeAttribute('disabled');
    } else {
        nextButtonElement.setAttribute('disabled', true);
    }
}
function addClass(element, nameOfTheClass){
    element.classList.add(nameOfTheClass);
}
function removeClass(element, nameOfTheClass){
    element.classList.remove(nameOfTheClass);
}
// Common Functions Ends Here

// Variables Starts Here 
const totalSeatElement = elementById('totalSeat');
const totalSeat = textToInteger(totalSeatElement);
const perSeatPriceElement = elementById('perSeatPrice');
const perSeatPrice = textToInteger(perSeatPriceElement);
const selectedSeatElement = elementById('selectedSeat');
let   selectedSeat = textToInteger(selectedSeatElement);
const totalPriceElement = elementById('totalPrice');
let   totalPrice = textToInteger(totalPriceElement);
const grandTotalElement = elementById('grandTotal');
const grandTotal = textToInteger(grandTotalElement);
const seatNumbers = elementsByClassName('seat-number');
const seatInfoContainer = elementById('seatInfoContainer');
const regex = /^01[3-9]\d{8}$/;
const passengerNumberElement = elementById('passengerNumber');
let passengerNumber = '';
passengerNumberElement.addEventListener('keyup', function (event) {
    passengerNumber = event.target.value;
    enableNextButton();
});
const nextButtonElement = elementById('nextButton');
const headerElement = elementByQuerySelector('header');
const mainElement = elementByQuerySelector('main');
const footerElement = elementByQuerySelector('footer');
const afterPurchase = elementByQuerySelector('.after-purchase');
const continueButton = elementById('continueButton');
// Variables Ends Here 

// Seat Number Iteration Starts Here 
for(const seatNumber of seatNumbers){
    seatNumber.addEventListener('click', function(element){
        element.target.classList.add('bg-green-color', 'text-white');
        selectedSeat+=1;
        setInnerText(selectedSeatElement, selectedSeat);
        setInnerText(totalSeatElement, remainingSeat(totalSeat, selectedSeat));
        const div = createAnHtmlElement('div');
        div.innerHTML = `
            <div class="grid grid-cols-3 gap-32 mt-4">
                <h5 class="inter-font font-normal text-[16px] text-dark-color/[.6]">
                    ${element.target.innerText}
                </h5>
                <h5 class="inter-font font-normal text-[16px] text-dark-color/[.6]">
                    Economoy
                </h5>
                <h5 class="inter-font font-normal text-[16px] text-dark-color/[.6]">
                    ${perSeatPrice}
                </h5>
            </div>
        `;
        appendContent(seatInfoContainer, div);
        totalPrice+=perSeatPrice;
        setInnerText(totalPriceElement, totalPrice);
        setInnerText(grandTotalElement, totalPrice);
        enableNextButton();
    });
}
// Seat Number Iteration Ends Here 

// After Next Button Clicking Functionality Starts Here
nextButtonElement.addEventListener('click', function(){
    addClass(headerElement, 'hidden');
    addClass(mainElement, 'hidden');
    addClass(footerElement, 'hidden');
    removeClass(afterPurchase, 'hidden');
    passengerNumberElement.value = '';
})
continueButton.addEventListener('click', function(){
    removeClass(headerElement, 'hidden');
    removeClass(mainElement, 'hidden');
    removeClass(footerElement, 'hidden');
    addClass(afterPurchase, 'hidden');
    selectedSeat = 0;
    setInnerText(selectedSeatElement, selectedSeat);
    setInnerText(totalSeatElement, totalSeat);
    totalPrice = 0;
    setInnerText(totalPriceElement, totalPrice);
    setInnerText(grandTotalElement, totalPrice);
    seatInfoContainer.innerHTML = '';
    for(const seatNumber of seatNumbers){
        seatNumber.classList.remove('bg-green-color', 'text-white');
    }
})
// After Next Button Clicking Functionality Ends Here