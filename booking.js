document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedBusJSON = urlParams.get("bus");

    if (selectedBusJSON) {
        const selectedBus = JSON.parse(decodeURIComponent(selectedBusJSON));
        displaySelectedBusDetails(selectedBus);
    }
});

function displaySelectedBusDetails(selectedBus) {

    const bookingDetails = document.getElementById("booking-details");


    // Assuming you have a reference to the selected bus data in selectedBus
    document.getElementById("busFrom").textContent = selectedBus.from;
    document.getElementById("busTo").textContent = selectedBus.to;
    document.getElementById("departureDate").textContent = selectedBus.departureDate;
    document.getElementById("departureTime").textContent = selectedBus.departureTime;
    document.getElementById("arrivalTime").textContent = selectedBus.arrivalTime;
    document.getElementById("busCost").textContent = selectedBus.cost;
    document.getElementById("busDuration").textContent = selectedBus.duration;

}
// Add an event listener for the "Confirm Booking" button
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("confirmBtn").addEventListener("click", function () {
        // Get customer information
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const passengersInput = document.getElementById("passengers");
        const passengersError = document.getElementById("passengersError");
        
        // Validate that none of the fields are empty
        if (!name || !email || !phone || !passengersInput.value) {
            alert("Please fill out all fields.");
            return; // Prevent further processing
        }

        // Validate the "passengers" input
        const passengers = parseInt(passengersInput.value);
        if (isNaN(passengers) || passengers <= 0) {
            passengersError.textContent = "Please enter a valid number of passengers.";
            return; // Prevent further processing
        } else {
            passengersError.textContent = ""; // Clear any previous error message
        }
   
        // Update the customer information in the billing section
        document.getElementById("billName").textContent = name;
        document.getElementById("billEmail").textContent = email;
        document.getElementById("billPhone").textContent = phone;

        // Get bus details
        const busFrom = document.getElementById("busFrom").textContent;
        const busTo = document.getElementById("busTo").textContent;
        const departureDate = document.getElementById("departureDate").textContent;
        const departureTime = document.getElementById("departureTime").textContent;
        const busCost = document.getElementById("busCost").textContent;
        const busDuration = document.getElementById("busDuration").textContent;

        // Calculate total cost (you can use your own logic)
        const totalCost = parseInt(passengers) * parseInt(busCost.split('₹')[1]); // Assuming busCost is in the format "₹XXX"

        // Generate a random ticket ID (you can use your own logic)
        const ticketId = generateTicketId();

        // Display the billing section with the collected data
        document.getElementById("billing-section").style.display = "block";
        document.getElementById("printButton").style.display = "block";

        document.getElementById("billName").textContent = name;
        document.getElementById("billEmail").textContent = email;
        document.getElementById("billPhone").textContent = phone;
        document.getElementById("billTotal").textContent = `₹${totalCost}`;
        document.getElementById("ticketId").textContent = ticketId;

        // Display bus details
        document.getElementById("busFrom").textContent = busFrom;
        document.getElementById("busTo").textContent = busTo;
        document.getElementById("departureDate").textContent = departureDate;
        document.getElementById("departureTime").textContent = departureTime;
        document.getElementById("busCost").textContent = busCost;
        document.getElementById("busDuration").textContent = busDuration;
        alert("Booking successfully confirmed!");

    });

    // Function to generate a random ticket ID (example)
    function generateTicketId() {
        return "TICKET" + Math.floor(Math.random() * 10000);
    }
    
});     
document.getElementById("printButton").addEventListener("click", function () {
    const sectionToCapture = document.getElementById("billing-section");

    html2canvas(sectionToCapture).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg');

        // Create a link element for download
        const a = document.createElement('a');
        a.href = imgData;
        a.download = 'billing.jpg';
        a.click();
    });
});
