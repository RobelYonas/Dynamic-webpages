document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const consentCheckbox = document.getElementById('consent');
    const submitButton = document.getElementById('submitButton');
    const contactForm = document.getElementById('contactForm');

    if (nameInput && emailInput && consentCheckbox && submitButton && contactForm) {
        // Function to check the form validity
        function checkFormValidity() {
            const nameValid = nameInput.value.trim() !== ''; // Check if the name input is not empty
            const emailValid = emailInput.value.includes('@') && emailInput.value.includes('.'); // Basic email validation
            const consentChecked = consentCheckbox.checked; // Checkbox must be checked

            submitButton.disabled = !(nameValid && emailValid && consentChecked); // Enable submit only if all conditions are met
        }

        // Event listeners for form inputs
        nameInput.addEventListener('input', checkFormValidity);
        emailInput.addEventListener('input', checkFormValidity);
        consentCheckbox.addEventListener('change', checkFormValidity);

        // Form submission event
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            if (submitButton.disabled) {
                alert("Please fill in the form correctly and give your consent.");
            } else {
                alert("Form submitted successfully!"); // Placeholder for actual form submission logic
                // Here you would typically send the form data to a server or process it as needed
            }
        });
    } else {
        console.error('One or more elements do not exist in the DOM');
    }
});
