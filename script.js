// --- Constants for Price Calculation ---
const BASE_FARE = 290; // PHP
const FUEL_SURCHARGE = 116; // PHP

// --- Helper Functions ---

/**
 * Calculates the total price based on the selected delivery option price.
 * @param {number} deliveryPrice The base price of the selected delivery option.
 * @returns {number} The total calculated price.
 */
function calculateTotalPrice(deliveryPrice) {
    return deliveryPrice + BASE_FARE + FUEL_SURCHARGE;
}

/**
 * Formats a number to Philippine Peso (₱) currency string.
 * @param {number} amount The amount to format.
 * @returns {string} The formatted currency string.
 */
function formatPrice(amount) {
    return '₱' + parseFloat(amount).toFixed(2);
}

// ----------------------------------------
// Function for schedule-initial.html
// ----------------------------------------
function scheduleInitialForm() {
    document.getElementById('initialForm')?.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Retrieve form data
        const pickupAddress = document.getElementById('pickupAddress').value;
        const deliveryAddress = document.getElementById('deliveryAddress').value;
        const shipmentType = document.getElementById('shipmentType').value;
        const weight = document.getElementById('weight').value;
        const dimensions = document.getElementById('dimensions').value;
        const preferredPickupDate = document.getElementById('preferredPickupDate').value;
        const preferredPickupTime = document.getElementById('preferredPickupTime').value;

        // Store data in local storage
        const shipmentDetails = {
            pickupAddress,
            deliveryAddress,
            shipmentType,
            weight,
            dimensions,
            preferredPickupDate,
            preferredPickupTime
        };
        localStorage.setItem('shipmentDetails', JSON.stringify(shipmentDetails));

        window.location.href = "delivery-options.html";
    });
}

// ----------------------------------------
// Function for delivery-options.html
// ----------------------------------------
function deliveryOptions() {
    // Retrieve shipment details from local storage
    const shipmentDetails = JSON.parse(localStorage.getItem('shipmentDetails'));

    // Populate summary section with shipment details
    if (shipmentDetails) {
        document.getElementById('pickupAddressSummary').textContent = shipmentDetails.pickupAddress;
        document.getElementById('deliveryAddressSummary').textContent = shipmentDetails.deliveryAddress;
        document.getElementById('shipmentTypeSummary').textContent = shipmentDetails.shipmentType;
        document.getElementById('weightSummary').textContent = shipmentDetails.weight;
        document.getElementById('dimensionsSummary').textContent = shipmentDetails.dimensions;
        document.getElementById('preferredPickupDateSummary').textContent = shipmentDetails.preferredPickupDate;
        document.getElementById('preferredPickupTimeSummary').textContent = shipmentDetails.preferredPickupTime;
    }

    // Dynamic price calculation handler
    const updatePrice = (deliveryPricePhp) => {
        const totalPricePhp = calculateTotalPrice(deliveryPricePhp);

        document.getElementById('deliveryOptionPrice').textContent = formatPrice(deliveryPricePhp);
        document.getElementById('totalPrice').textContent = formatPrice(totalPricePhp);
    };

    // Initial calculation on page load (uses the checked radio button, which is 'Standard' by default)
    const initialRadio = document.querySelector('input[name="deliveryOption"]:checked');
    if (initialRadio) {
        const initialPrice = parseFloat(initialRadio.dataset.price);
        updatePrice(initialPrice);
    } else {
        // Fallback for no option selected (shouldn't happen with 'checked' attribute)
        updatePrice(0);
    }


    // Event listener for delivery option changes
    document.querySelectorAll('input[name="deliveryOption"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const deliveryPricePhp = parseFloat(this.dataset.price);
            updatePrice(deliveryPricePhp);
        });
    });
}

function deliveryOptionsContinue() {
    // 1. Get selected delivery option and price
    const selectedDeliveryRadio = document.querySelector('input[name="deliveryOption"]:checked');
    const contactName = document.getElementById('contactName').value.trim();
    const contactPhone = document.getElementById('contactPhone').value.trim();

    if (!selectedDeliveryRadio) {
        alert('Please select a delivery option.');
        return;
    }

    if (!contactName || !contactPhone) {
        alert('Please enter both recipient name and phone number.');
        return;
    }

    const deliveryOption = selectedDeliveryRadio.value;
    const deliveryPricePhp = parseFloat(document.getElementById('totalPrice').textContent.slice(1)); // Get total price

    // 2. Store contact and final price details
    localStorage.setItem('selectedDeliveryOption', deliveryOption);
    localStorage.setItem('selectedDeliveryPrice', deliveryPricePhp.toFixed(2));
    localStorage.setItem('contactName', contactName);
    localStorage.setItem('contactPhone', contactPhone);

    // 3. Navigate
    window.location.href = "confirmation.html";
}


// ----------------------------------------
// Function for confirmation.html
// ----------------------------------------
function confirmation() {
    // Retrieve all data from local storage
    const shipmentDetails = JSON.parse(localStorage.getItem('shipmentDetails'));
    const deliveryOption = localStorage.getItem('selectedDeliveryOption');
    const deliveryPricePhp = localStorage.getItem('selectedDeliveryPrice');
    const contactName = localStorage.getItem('contactName');
    const contactPhone = localStorage.getItem('contactPhone');

    // Populate contact details
    if (contactName && document.getElementById('contactNameSummary')) {
        document.getElementById('contactNameSummary').textContent = contactName;
    }
    if (contactPhone && document.getElementById('contactPhoneSummary')) {
        document.getElementById('contactPhoneSummary').textContent = contactPhone;
    }

    // Populate shipment details
    if (shipmentDetails) {
        document.getElementById('pickupAddressSummary').textContent = shipmentDetails.pickupAddress;
        document.getElementById('deliveryAddressSummary').textContent = shipmentDetails.deliveryAddress;
        document.getElementById('shipmentTypeSummary').textContent = shipmentDetails.shipmentType;
        document.getElementById('weightSummary').textContent = shipmentDetails.weight + ' kg';
        document.getElementById('dimensionsSummary').textContent = shipmentDetails.dimensions + ' cm';
        document.getElementById('preferredPickupDateSummary').textContent = shipmentDetails.preferredPickupDate;
    }

    // Populate final details
    if (deliveryOption) {
        document.getElementById('deliveryOptionSummary').textContent = deliveryOption;
    }

    if (deliveryPricePhp) {
        document.getElementById('deliveryPriceSummary').textContent = formatPrice(deliveryPricePhp);
    }
}

/**
 * Clears all local storage data and redirects to the homepage.
 */
function clearLocalStorageAndGoToIndex() {
    localStorage.clear();
    window.location.href = "index.html";
}

// Prevent the use of the native alert function (replace with custom logic or logging)
window.alert = function(message) {
    console.error("Alert suppressed:", message);
    // In a production app, this would be replaced by a custom modal UI.
    const container = document.querySelector('.container');
    if (container) {
        let alertBox = document.getElementById('custom-alert');
        if (!alertBox) {
            alertBox = document.createElement('div');
            alertBox.id = 'custom-alert';
            alertBox.style.cssText = `
                position: fixed; top: 10px; right: 10px; padding: 10px 20px;
                background-color: var(--color-danger); color: white;
                border-radius: 8px; z-index: 1000; box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                animation: fadein 0.5s, fadeout 0.5s 2.5s;
            `;
            container.appendChild(alertBox);

            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes fadein { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeout { from { opacity: 1; } to { opacity: 0; } }
            `;
            document.head.appendChild(style);
        }
        alertBox.textContent = message;
        alertBox.style.display = 'block';
        setTimeout(() => alertBox.style.display = 'none', 3000);
    }
};