// ----- script.js -----
// Car Price Predictor - Interactive Features

(function() {
    'use strict';

    // DOM elements
    const resultDemo = document.getElementById('resultDemo');
    const priceSpan = document.getElementById('priceValue');
    const predictForm = document.getElementById('predictForm');
    
    // Form inputs
    const carModel = document.getElementById('carModel');
    const carCompany = document.getElementById('carCompany');
    const carYear = document.getElementById('carYear');
    const carKms = document.getElementById('carKms');
    const carFuel = document.getElementById('carFuel');
    
    // All input fields for general interactivity
    const allInputs = document.querySelectorAll('input, select');

    /**
     * Format number with Indian rupee style (comma separated)
     */
    function formatPrice(num) {
        return Math.round(num).toLocaleString('en-IN');
    }

    /**
     * Calculate estimated price based on form inputs
     * This is a demo calculation - in production, this would be a server-side prediction
     */
    function calculatePrice() {
        let basePrice = 485000; // Base price in INR
        
        // Get current values
        const yearVal = parseInt(carYear?.value);
        const kmsVal = parseInt(carKms?.value);
        const fuel = carFuel?.value || 'Petrol';
        const model = carModel?.value?.toLowerCase() || '';
        const company = carCompany?.value?.toLowerCase() || '';

        // --- Year adjustment ---
        // Newer cars cost more, older cars cost less
        if (!isNaN(yearVal) && yearVal >= 2000 && yearVal <= 2030) {
            const currentYear = new Date().getFullYear();
            const age = currentYear - yearVal;
            if (age > 0) {
                // Depreciation: ~8-12% per year
                const depreciationRate = 0.10; // 10% per year
                const depreciationFactor = Math.pow(1 - depreciationRate, age);
                basePrice = basePrice * depreciationFactor;
            } else if (age < 0) {
                // Future year (brand new concept) - premium
                basePrice = basePrice * 1.05;
            }
        }

        // --- Kilometers adjustment ---
        // More kilometers = lower price
        if (!isNaN(kmsVal) && kmsVal > 0) {
            const kmsDeduction = Math.floor(kmsVal / 5000) * 2500;
            basePrice = basePrice - kmsDeduction;
        }

        // --- Fuel type adjustment ---
        if (fuel === 'Diesel') {
            basePrice = basePrice * 1.12; // Diesel cars often cost more
        } else if (fuel === 'CNG') {
            basePrice = basePrice * 0.88; // CNG cars cost less
        }

        // --- Company premium/discount ---
        const premiumBrands = ['bmw', 'mercedes', 'audi', 'porsche', 'land rover', 'jaguar', 'volvo', 'lexus'];
        const budgetBrands = ['maruti', 'suzuki', 'tata', 'renault', 'nissan', 'datsun', 'hyundai', 'kia', 'honda', 'toyota'];
        
        if (premiumBrands.some(brand => company.includes(brand))) {
            basePrice = basePrice * 1.25; // 25% premium for luxury brands
        } else if (budgetBrands.some(brand => company.includes(brand))) {
            basePrice = basePrice * 0.95; // 5% discount for budget brands
        }

        // --- Model name adjustment (simple keyword based) ---
        if (model.includes('suv') || model.includes('crossover')) {
            basePrice = basePrice * 1.10;
        } else if (model.includes('hatchback') || model.includes('compact')) {
            basePrice = basePrice * 0.90;
        } else if (model.includes('luxury') || model.includes('premium')) {
            basePrice = basePrice * 1.20;
        } else if (model.includes('sports') || model.includes('gt')) {
            basePrice = basePrice * 1.30;
        }

        // Clamp price to realistic range (₹80,000 - ₹1,20,00,000)
        if (basePrice < 80000) basePrice = 80000;
        if (basePrice > 12000000) basePrice = 12000000;

        return basePrice;
    }

    /**
     * Update the displayed price with animation
     */
    function updatePrice() {
        const price = calculatePrice();
        const formattedPrice = formatPrice(price);
        
        if (priceSpan) {
            priceSpan.textContent = formattedPrice;
        }

        // Pulse animation effect
        if (resultDemo) {
            resultDemo.style.transition = 'transform 0.15s ease, box-shadow 0.2s ease';
            resultDemo.style.transform = 'scale(0.97)';
            resultDemo.style.boxShadow = '0 0 0 3px rgba(90, 160, 255, 0.3)';
            
            setTimeout(() => {
                resultDemo.style.transform = 'scale(1)';
                resultDemo.style.boxShadow = 'none';
            }, 150);
        }
    }

    /**
     * Simple pulse effect for any input interaction
     */
    function pulseResult() {
        if (resultDemo) {
            resultDemo.style.transition = 'transform 0.1s ease';
            resultDemo.style.transform = 'scale(0.99)';
            setTimeout(() => {
                resultDemo.style.transform = 'scale(1)';
            }, 100);
        }
    }

    /**
     * Handle form submission - intercept and show loading state
     */
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Show loading state on button
        const submitBtn = predictForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate API call / processing
        setTimeout(() => {
            // Update price with current form values
            updatePrice();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Success feedback
            if (resultDemo) {
                resultDemo.style.borderColor = '#4CAF50';
                resultDemo.style.boxShadow = '0 0 20px rgba(76, 175, 80, 0.2)';
                setTimeout(() => {
                    resultDemo.style.borderColor = 'rgba(100, 160, 255, 0.15)';
                    resultDemo.style.boxShadow = 'none';
                }, 2000);
            }
        }, 800);
        
        // In a real implementation, you would submit the form data to your backend:
        // const formData = new FormData(predictForm);
        // fetch('/predict', { method: 'POST', body: formData })
        //     .then(response => response.json())
        //     .then(data => { /* update price */ })
        //     .catch(error => console.error('Error:', error));
    }

    /**
     * Initialize event listeners
     */
    function init() {
        // Real-time price updates on relevant inputs
        if (carYear) carYear.addEventListener('input', updatePrice);
        if (carKms) carKms.addEventListener('input', updatePrice);
        if (carFuel) carFuel.addEventListener('change', updatePrice);
        if (carModel) carModel.addEventListener('input', updatePrice);
        if (carCompany) carCompany.addEventListener('input', updatePrice);

        // General pulse effect on any input
        allInputs.forEach(inp => {
            inp.addEventListener('input', function() {
                // Only pulse if not already handled by specific update
                if (this !== carYear && this !== carKms && 
                    this !== carFuel && this !== carModel && 
                    this !== carCompany) {
                    pulseResult();
                }
            });
        });

        // Form submission handler
        if (predictForm) {
            predictForm.addEventListener('submit', handleFormSubmit);
        }

        // Initial price calculation on load
        setTimeout(updatePrice, 100);
    }

    // Wait for DOM to be fully ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();