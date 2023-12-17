// script.js

document.getElementById("searchBtn").addEventListener("click", function() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    const busList = document.getElementById("busList");

    // Access sampleBusData as a global variable
    const sampleBusData = window.sampleBusData;

    // Filter the sample data based on user input
    const filteredData = sampleBusData.filter((bus) => {
        return bus.from === from && bus.to === to && bus.departureDate === date;
    });

    // Clear any existing search results
    busList.innerHTML = '';

    if (filteredData.length > 0) {
        // Display all the filtered search results
        filteredData.forEach((bus, index) => {
            const busInfo = `<li class="bus-item">
                <h3>Bus from ${bus.from} to ${bus.to}</h3>
                <p class="departure-info">Departure Date: ${bus.departureDate}</p>
                <p class="departure-info">Departure Time: ${bus.departureTime}</p>
                <p class="arrival-info">Arrival Time: ${bus.arrivalTime}</p>
                <p class="cost-info">Cost: ${bus.cost}</p>
                <p class="duration-info">Duration: ${bus.duration}</p>
                <button class="bookBtn" data-index="${index}">Book Ticket</button>
            </li>`;

            busList.innerHTML += busInfo;
        });

        // Add event listeners for booking buttons
        const bookButtons = document.getElementsByClassName("bookBtn");
        for (let i = 0; i < bookButtons.length; i++) {
            bookButtons[i].addEventListener("click", function() {
                // Remove the "active" class from all buttons
                for (let j = 0; j < bookButtons.length; j++) {
                    bookButtons[j].classList.remove("active");
                }
                // Add the "active" class to the clicked button
                this.classList.add("active");
                const index = this.getAttribute("data-index");
                if (filteredData[index]) {
                    const selectedBus = filteredData[index];
                    const selectedBusJSON = JSON.stringify(selectedBus);
                    window.location.href = `booking.html?bus=${encodeURIComponent(selectedBusJSON)}`;
                }
            });
        }
    } else {
        // Display a message if no matching buses are found
        busList.innerHTML = '<p>No buses found for the selected criteria.</p>';
    }
});
