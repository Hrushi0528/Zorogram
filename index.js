document.addEventListener("DOMContentLoaded", function () {
    // === Typing Effect for Quotes ===
    const quotes = [
        "Plan. Explore. Share.",
        "Discover. Capture. Inspire.",
        "Organize. Document. Connect.",
        "Prepare. Experience. Engage.",
        "Chart. Photograph. Bond.",
        "Schedule. Snap. Share."
    ];
  
    let currentQuoteIndex = 0;
    const quoteElement = document.getElementById("quote");
  
    function typeQuote(index = 0) {
        const currentQuote = quotes[currentQuoteIndex];
  
        if (index < currentQuote.length) {
            quoteElement.textContent += currentQuote.charAt(index);
            setTimeout(() => typeQuote(index + 1), 100);
        } else {
            setTimeout(() => {
                quoteElement.textContent = "";
                currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                typeQuote();
            }, 2000);
        }
    }
  
    if (quoteElement) {
        typeQuote();
    }
  
    // === Smooth Scrolling for Navbar Links & Manual Scroll Detection ===
    const navbarLinks = document.querySelectorAll(".nav-link");
    const homeNav = document.getElementById("home");
    const searchNav = document.getElementById("search");
    const searchSection = document.getElementById("description-div"); // Update with actual search section ID
    const sections = {
        "search": "description-div",
        "about": "about-div"
    };
  
    navbarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
  
            navbarLinks.forEach(link => link.classList.remove("active"));
            event.target.classList.add("active");
  
            const targetID = sections[event.target.id];
  
            if (targetID) {
                let targetDiv = document.getElementById(targetID);
                let navbarHeight = document.querySelector(".navbar").offsetHeight;
                let targetPosition = targetDiv.getBoundingClientRect().top + window.scrollY - navbarHeight - 70;
  
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            } else if (event.target.id === "home") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });
  
    // === Detect Manual Scroll to Search Section ===
    if (searchSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelector(".nav-link.active")?.classList.remove("active");
                    searchNav.classList.add("active");
                } else {
                    searchNav.classList.remove("active");
                    homeNav.classList.add("active");
                }
            });
        }, { threshold: 0.5 });
  
        observer.observe(searchSection);
    }
  
    // === Start Button Modal ===
    document.getElementById('startButton').addEventListener('click', function () {
        document.getElementById('backgroundContainer').classList.remove('hidden');
        this.style.display = 'none'; // Hide start button
    });
    
    document.getElementById('planButton').addEventListener('click', function () {
        const tripName = document.getElementById('tripName').value.trim();
        const numberOfDays = parseInt(document.getElementById('numberOfDays').value, 10);
        const tripTitle = document.getElementById('tripTitle');
        const tripFormContainer = document.getElementById('tripFormContainer');
        const tripContainer = document.getElementById('tripContainer');
        const dayButtonsContainer = document.getElementById('dayButtonsContainer');
    
        if (!tripName || isNaN(numberOfDays) || numberOfDays <= 0) {
            alert('Please enter a valid trip name and number of days.');
            return;
        }
    
        // Hide form and show trip details
        tripFormContainer.classList.add('hidden');
        tripTitle.textContent = `Trip: ${tripName} (${numberOfDays} days)`;
        tripTitle.classList.remove('hidden');
        tripContainer.classList.remove('hidden');
        dayButtonsContainer.innerHTML = '';
    
        // Create day boxes
        for (let i = 1; i <= numberOfDays; i++) {
            const dayBox = document.createElement('div');
            dayBox.className = 'day-box';
            dayBox.textContent = `Day ${i}`;
            dayBox.addEventListener('click', function () {
                alert(`Plan for Day ${i}`); // Placeholder functionality
            });
            dayButtonsContainer.appendChild(dayBox);
        }
    });
    
    document.getElementById('resetButton').addEventListener('click', function () {
        document.getElementById('tripTitle').textContent = '';
        document.getElementById('tripTitle').classList.add('hidden');
        document.getElementById('tripContainer').classList.add('hidden');
        document.getElementById('dayButtonsContainer').innerHTML = '';
        document.getElementById('tripFormContainer').classList.remove('hidden');
        document.getElementById('tripName').value = '';
        document.getElementById('numberOfDays').value = '';
    });
    
    document.getElementById('closeButton').addEventListener('click', function () {
        document.getElementById('backgroundContainer').classList.add('hidden');
        document.getElementById('startButton').style.display = 'block';
    });
    
  
    // === Filtering Trip Sections ===
    const filterLinks = document.querySelectorAll(".trip-filter a");
    const filters = document.querySelectorAll(".filter");
  
    if (filterLinks.length > 0 && filters.length > 0) {
        filterLinks.forEach(link => {
            link.addEventListener("click", function (event) {
                event.preventDefault();
  
                let targetId = this.getAttribute("href").substring(1);
  
                filters.forEach(filter => filter.style.display = "none");
  
                let targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = "block";
                }
            });
        });
  
        // Show the first filter section by default
        filters.forEach(filter => filter.style.display = "none");
        document.getElementById("destination").style.display = "block";
    }
  });
  
  