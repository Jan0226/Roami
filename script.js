// Roami App JavaScript

// App State
let currentScreen = 'route-planner';
let journalEntries = JSON.parse(localStorage.getItem('roami-journal')) || [
    {
        id: 1,
        title: "Since I walk Past a Ramen Resturant, i decide to eat ramen for dinner.",
        content: "Since I walk Past a Ramen Resturant, i decide to eat ramen for dinner.",
        date: "2025-01-07T18:00:00.000Z",
        type: "manual-entry"
    },
    {
        id: 2,
        title: "I am brain storming for my school's english essay, and I want to write about the book Macbeth.",
        content: "I am brain storming for my school's english essay, and I want to write about the book Macbeth.",
        date: "2025-06-02T15:00:00.000Z",
        type: "manual-entry"
    }
];
let walkingStats = {
    steps: 0,
    distance: 0,
    time: 0,
    startTime: null
};

// Motivation Quotes
const motivationQuotes = [
    "Every step you take is a step towards a healthier you.",
    "Walking is the best possible exercise. Habituate yourself to walk very far.",
    "The journey of a thousand miles begins with one step.",
    "Walking is man's best medicine.",
    "Take a walk outside. It will serve you far more than pacing around in your mind.",
    "Walking is the perfect way of moving if you want to see into the life of things.",
    "All truly great thoughts are conceived while walking.",
    "Walking is the natural recreation for a man who desires not absolutely to suppress his intellect but to turn it out to play for a season.",
    "I only went out for a walk and finally concluded to stay out till sundown, for going out, I found, was really going in.",
    "Walking is a virtue, tourism is a deadly sin.",
    "The best ideas come as jokes. Make your thinking as funny as possible.",
    "Walking is the most ancient exercise and still the best modern exercise.",
    "A walk in nature walks the soul back home.",
    "Walking is the great adventure, the first meditation, a practice of heartiness and soul primary to humankind.",
    "Walking is the most natural and the most human of activities."
];

// Route Data (simulated)
const routeDatabase = {
    forest: [
        {
            name: "Pine Valley Trail",
            description: "A serene forest path through towering pine trees with gentle elevation changes.",
            scenery: "forest",
            duration: 30,
            distance: 2.1,
            steps: 3500,
            difficulty: "Easy"
        },
        {
            name: "Oak Ridge Loop",
            description: "A peaceful loop through mixed hardwood forest with wildlife viewing opportunities.",
            scenery: "forest",
            duration: 45,
            distance: 3.2,
            steps: 4800,
            difficulty: "Moderate"
        },
        {
            name: "Cedar Creek Path",
            description: "A scenic trail following a babbling creek through dense cedar forest.",
            scenery: "forest",
            duration: 60,
            distance: 4.5,
            steps: 6500,
            difficulty: "Moderate"
        }
    ],
    urban: [
        {
            name: "Downtown Art Walk",
            description: "A cultural stroll through the city's art district with murals and sculptures.",
            scenery: "urban",
            duration: 30,
            distance: 2.3,
            steps: 3800,
            difficulty: "Easy"
        },
        {
            name: "Riverside Promenade",
            description: "A modern walkway along the river with city skyline views and cafes.",
            scenery: "urban",
            duration: 45,
            distance: 3.4,
            steps: 5200,
            difficulty: "Easy"
        },
        {
            name: "Historic District Tour",
            description: "A journey through the city's historic architecture and landmarks.",
            scenery: "urban",
            duration: 60,
            distance: 4.2,
            steps: 6000,
            difficulty: "Moderate"
        }
    ],
    neighborhood: [
        {
            name: "Maple Street Loop",
            description: "A charming walk through tree-lined residential streets with friendly neighbors.",
            scenery: "neighborhood",
            duration: 15,
            distance: 1.2,
            steps: 2000,
            difficulty: "Easy"
        },
        {
            name: "Garden District Stroll",
            description: "A beautiful walk past well-maintained gardens and historic homes.",
            scenery: "neighborhood",
            duration: 30,
            distance: 2.0,
            steps: 3200,
            difficulty: "Easy"
        },
        {
            name: "Community Park Circuit",
            description: "A family-friendly route connecting multiple neighborhood parks and playgrounds.",
            scenery: "neighborhood",
            duration: 45,
            distance: 3.1,
            steps: 4700,
            difficulty: "Moderate"
        }
    ]
};

// Leaderboard Data (simulated)
const leaderboardData = {
    current: [
        { name: "Sarah Johnson", steps: 15420, region: "Downtown" },
        { name: "Mike Chen", steps: 12850, region: "Downtown" },
        { name: "Emma Davis", steps: 11230, region: "Downtown" },
        { name: "Alex Rodriguez", steps: 9870, region: "Downtown" },
        { name: "Lisa Wang", steps: 8650, region: "Downtown" }
    ],
    city: [
        { name: "David Kim", steps: 18920, region: "City Center" },
        { name: "Sarah Johnson", steps: 15420, region: "Downtown" },
        { name: "Maria Garcia", steps: 14230, region: "Westside" },
        { name: "Mike Chen", steps: 12850, region: "Downtown" },
        { name: "James Wilson", steps: 11560, region: "North District" }
    ],
    state: [
        { name: "Jennifer Lee", steps: 23450, region: "Capital City" },
        { name: "Robert Brown", steps: 20120, region: "Port City" },
        { name: "David Kim", steps: 18920, region: "Your City" },
        { name: "Amanda White", steps: 16780, region: "Mountain Town" },
        { name: "Sarah Johnson", steps: 15420, region: "Your City" }
    ],
    country: [
        { name: "Carlos Mendez", steps: 45670, region: "West Coast" },
        { name: "Jennifer Lee", steps: 23450, region: "Your State" },
        { name: "Robert Brown", steps: 20120, region: "Your State" },
        { name: "David Kim", steps: 18920, region: "Your State" },
        { name: "Amanda White", steps: 16780, region: "Your State" }
    ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen for 2 seconds
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 2000);

    // Initialize navigation
    initializeNavigation();
    
    // Initialize route planner
    initializeRoutePlanner();
    
    // Initialize walking screen
    initializeWalkingScreen();
    
    // Initialize journal
    initializeJournal();
    
    // Initialize leaderboard
    initializeLeaderboard();
    
    // Load initial data
    loadJournalEntries();
    updateLeaderboard('current');
});

// Navigation Functions
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetScreen = button.getAttribute('data-screen');
            switchScreen(targetScreen);
        });
    });
}

function switchScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(screenName).classList.add('active');
    
    // Add active class to corresponding nav button
    document.querySelector(`[data-screen="${screenName}"]`).classList.add('active');
    
    currentScreen = screenName;
}

// Route Planner Functions
function initializeRoutePlanner() {
    const findRoutesBtn = document.getElementById('find-routes');
    findRoutesBtn.addEventListener('click', findRoutes);
}

function findRoutes() {
    const scenery = document.getElementById('scenery').value;
    const duration = parseInt(document.getElementById('duration').value);
    const targetSteps = parseInt(document.getElementById('steps').value);
    
    if (!scenery || !duration || !targetSteps) {
        alert('Please fill in all fields to find routes.');
        return;
    }
    
    // Get routes based on scenery preference
    let availableRoutes = [];
    
    if (scenery === 'mixed') {
        // Combine routes from all categories
        Object.values(routeDatabase).forEach(category => {
            availableRoutes = availableRoutes.concat(category);
        });
    } else {
        availableRoutes = routeDatabase[scenery] || [];
    }
    
    // Filter routes based on duration and steps
    const filteredRoutes = availableRoutes.filter(route => {
        const durationMatch = Math.abs(route.duration - duration) <= 15;
        const stepsMatch = Math.abs(route.steps - targetSteps) <= 2000;
        return durationMatch || stepsMatch;
    });
    
    // Sort by relevance and take top 3
    const sortedRoutes = filteredRoutes.sort((a, b) => {
        const aScore = Math.abs(a.duration - duration) + Math.abs(a.steps - targetSteps);
        const bScore = Math.abs(b.duration - duration) + Math.abs(b.steps - targetSteps);
        return aScore - bScore;
    });
    
    const recommendedRoutes = sortedRoutes.slice(0, 3);
    
    // If not enough filtered routes, add some from the original category
    if (recommendedRoutes.length < 3 && scenery !== 'mixed') {
        const additionalRoutes = routeDatabase[scenery].filter(route => 
            !recommendedRoutes.find(r => r.name === route.name)
        );
        recommendedRoutes.push(...additionalRoutes.slice(0, 3 - recommendedRoutes.length));
    }
    
    displayRoutes(recommendedRoutes);
}

function displayRoutes(routes) {
    const routesList = document.getElementById('routes-list');
    const routesResults = document.getElementById('routes-results');
    
    routesList.innerHTML = '';
    
    routes.forEach(route => {
        const routeCard = document.createElement('div');
        routeCard.className = 'route-card';
        routeCard.innerHTML = `
            <h4>${route.name}</h4>
            <p>${route.description}</p>
            <div class="route-stats">
                <span>⏱️ ${route.duration} min</span>
                <span>📏 ${route.distance} km</span>
                <span>👣 ${route.steps} steps</span>
                <span>🏃 ${route.difficulty}</span>
            </div>
        `;
        routesList.appendChild(routeCard);
    });
    
    routesResults.style.display = 'block';
}

// Walking Screen Functions
function initializeWalkingScreen() {
    const newQuoteBtn = document.getElementById('new-quote');
    const saveIdeaBtn = document.getElementById('save-idea');
    
    newQuoteBtn.addEventListener('click', getNewQuote);
    saveIdeaBtn.addEventListener('click', saveIdea);
    
    // Start walking session
    startWalkingSession();
}

function getNewQuote() {
    const quoteElement = document.getElementById('motivation-quote');
    const currentQuote = quoteElement.textContent;
    let newQuote;
    
    do {
        newQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
    } while (newQuote === currentQuote && motivationQuotes.length > 1);
    
    quoteElement.textContent = newQuote;
}

function saveIdea() {
    const ideaText = document.getElementById('idea-input').value.trim();
    
    if (!ideaText) {
        alert('Please write something before saving.');
        return;
    }
    
    const newEntry = {
        id: Date.now(),
        title: ideaText.substring(0, 50) + (ideaText.length > 50 ? '...' : ''),
        content: ideaText,
        date: new Date().toISOString(),
        type: 'walking-idea'
    };
    
    journalEntries.unshift(newEntry);
    localStorage.setItem('roami-journal', JSON.stringify(journalEntries));
    
    // Clear the input
    document.getElementById('idea-input').value = '';
    
    // Show confirmation message in-app
    showIdeaConfirmation();
    
    // Update journal display if on journal screen
    if (currentScreen === 'journal') {
        loadJournalEntries();
    }
}

function showIdeaConfirmation() {
    let confirmDiv = document.getElementById('idea-confirmation');
    if (!confirmDiv) {
        confirmDiv = document.createElement('div');
        confirmDiv.id = 'idea-confirmation';
        confirmDiv.className = 'idea-confirmation-message';
        const ideaCapture = document.querySelector('.idea-capture');
        ideaCapture.appendChild(confirmDiv);
    }
    confirmDiv.textContent = 'Idea saved to your journal!';
    confirmDiv.style.display = 'block';
    setTimeout(() => {
        confirmDiv.style.display = 'none';
    }, 2000);
}

function startWalkingSession() {
    walkingStats.startTime = new Date();
    
    // Simulate step counting (in a real app, this would use device sensors)
    setInterval(() => {
        if (currentScreen === 'walking') {
            walkingStats.steps += Math.floor(Math.random() * 10) + 1;
            walkingStats.distance = (walkingStats.steps * 0.0008).toFixed(1); // Approximate km
            walkingStats.time = Math.floor((new Date() - walkingStats.startTime) / 1000);
            
            updateWalkingStats();
        }
    }, 3000); // Update every 3 seconds
}

function updateWalkingStats() {
    document.getElementById('current-steps').textContent = walkingStats.steps.toLocaleString();
    document.getElementById('current-distance').textContent = walkingStats.distance;
    
    const minutes = Math.floor(walkingStats.time / 60);
    const seconds = walkingStats.time % 60;
    document.getElementById('current-time').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Journal Functions
function initializeJournal() {
    const newEntryBtn = document.getElementById('new-journal-entry');
    const filterBtn = document.getElementById('filter-journal');
    newEntryBtn.addEventListener('click', openJournalModal);
    filterBtn.addEventListener('click', filterJournalEntries);

    // Modal event listeners
    document.getElementById('save-journal-btn').addEventListener('click', saveJournalFromModal);
    document.getElementById('cancel-journal-btn').addEventListener('click', closeJournalModal);
}

function openJournalModal() {
    document.getElementById('journal-title').value = '';
    document.getElementById('journal-content').value = '';
    document.getElementById('journal-modal').classList.remove('hidden');
}

function closeJournalModal() {
    document.getElementById('journal-modal').classList.add('hidden');
}

function saveJournalFromModal() {
    const title = document.getElementById('journal-title').value.trim();
    const content = document.getElementById('journal-content').value.trim();
    if (!title || !content) {
        alert('Please enter both a title and content for your journal entry.');
        return;
    }
    const newEntry = {
        id: Date.now(),
        title: title,
        content: content,
        date: new Date().toISOString(),
        type: 'manual-entry'
    };
    journalEntries.unshift(newEntry);
    localStorage.setItem('roami-journal', JSON.stringify(journalEntries));
    closeJournalModal();
    loadJournalEntries();
}

function loadJournalEntries() {
    const entriesContainer = document.getElementById('journal-entries');
    
    if (journalEntries.length === 0) {
        entriesContainer.innerHTML = `
            <div class="text-center" style="padding: 2rem; color: var(--gray);">
                <p>No journal entries yet.</p>
                <p>Start walking and capture your ideas!</p>
            </div>
        `;
        return;
    }
    
    entriesContainer.innerHTML = '';
    
    journalEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'journal-entry';
        
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        entryElement.innerHTML = `
            <h4>${entry.title}</h4>
            <p>${entry.content}</p>
            <div class="entry-date">${formattedDate}</div>
        `;
        
        entriesContainer.appendChild(entryElement);
    });
}

function filterJournalEntries() {
    const filterType = prompt('Filter by type:\n1. All entries\n2. Walking ideas\n3. Manual entries\n\nEnter 1, 2, or 3:');
    
    let filteredEntries = journalEntries;
    
    switch(filterType) {
        case '2':
            filteredEntries = journalEntries.filter(entry => entry.type === 'walking-idea');
            break;
        case '3':
            filteredEntries = journalEntries.filter(entry => entry.type === 'manual-entry');
            break;
        default:
            // Show all entries
            break;
    }
    
    displayFilteredEntries(filteredEntries);
}

function displayFilteredEntries(entries) {
    const entriesContainer = document.getElementById('journal-entries');
    
    if (entries.length === 0) {
        entriesContainer.innerHTML = `
            <div class="text-center" style="padding: 2rem; color: var(--gray);">
                <p>No entries found for this filter.</p>
            </div>
        `;
        return;
    }
    
    entriesContainer.innerHTML = '';
    
    entries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.className = 'journal-entry';
        
        const date = new Date(entry.date);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        entryElement.innerHTML = `
            <h4>${entry.title}</h4>
            <p>${entry.content}</p>
            <div class="entry-date">${formattedDate}</div>
        `;
        
        entriesContainer.appendChild(entryElement);
    });
}

// Leaderboard Functions
function initializeLeaderboard() {
    const regionSelect = document.getElementById('region-select');
    regionSelect.addEventListener('change', (e) => {
        updateLeaderboard(e.target.value);
    });
}

function updateLeaderboard(region) {
    const leaderboardList = document.getElementById('leaderboard-list');
    const data = leaderboardData[region] || [];
    
    leaderboardList.innerHTML = '';
    
    data.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.className = 'leaderboard-entry';
        
        entryElement.innerHTML = `
            <div class="leaderboard-rank">${index + 1}</div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${entry.name}</div>
                <div class="leaderboard-stats">
                    <span class="leaderboard-steps">${entry.steps.toLocaleString()} steps</span> • ${entry.region}
                </div>
            </div>
        `;
        
        leaderboardList.appendChild(entryElement);
    });
}

// Google Maps and Backend Integration
let map;
let directionsService;
let directionsRenderer;
let startAutocomplete;
let endAutocomplete;

// Initialize Google Maps
function createCenterControl(map) {
    const chicago = { lat: 41.85, lng: -87.65 };
    const controlButton = document.createElement("button");
    controlButton.classList.add('buttonStyle');
    controlButton.textContent = "Center Map";
    controlButton.title = "Click to recenter the map";
    controlButton.type = "button";
    controlButton.addEventListener("click", () => {
        map.setCenter(chicago);
    });
    return controlButton;
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 12
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    // Add KML/GeoRSS Layer
    var georssLayer = new google.maps.KmlLayer({
        url: "http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss",
    });
    georssLayer.setMap(map);

    // Add Center Map Control
    const centerControlDiv = document.createElement("div");
    const centerControl = createCenterControl(map);
    centerControlDiv.appendChild(centerControl);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

    // Initialize autocomplete for location inputs
    startAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('start-location')
    );
    endAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('end-location')
    );

    // Get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
            },
            () => {
                console.log('Error: The Geolocation service failed.');
            }
        );
    }
}

// Function to calculate route
async function calculateRoute() {
    const start = document.getElementById('start-location').value;
    const end = document.getElementById('end-location').value;
    const scenery = document.getElementById('scenery').value;
    const duration = document.getElementById('duration').value;
    const steps = document.getElementById('steps').value;

    if (!start || !end) {
        alert('Please enter both start and end locations');
        return;
    }

    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
    };

    directionsService.route(request, async (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);

            // Save route to backend
            try {
                const route = {
                    name: `${start} to ${end}`,
                    scenery: scenery,
                    duration: parseInt(duration),
                    steps: parseInt(steps),
                    startLocation: result.routes[0].legs[0].start_location.toJSON(),
                    endLocation: result.routes[0].legs[0].end_location.toJSON(),
                    waypoints: result.routes[0].overview_path.map(point => point.toJSON())
                };

                const response = await fetch('http://localhost:3000/api/routes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(route)
                });

                if (!response.ok) {
                    throw new Error('Failed to save route');
                }

                showRoutesList();
            } catch (error) {
                console.error('Error saving route:', error);
            }
        } else {
            alert('Could not calculate route: ' + status);
        }
    });
}

// Function to display saved routes
async function showRoutesList() {
    const routesList = document.getElementById('routes-list');
    const routesResults = document.getElementById('routes-results');
    
    try {
        const response = await fetch('http://localhost:3000/api/routes/search' + window.location.search);
        const routes = await response.json();

        routesList.innerHTML = routes.map(route => `
            <div class="route-card">
                <h4>${route.name}</h4>
                <p>Scenery: ${route.scenery}</p>
                <p>Duration: ${route.duration} minutes</p>
                <p>Steps: ${route.steps}</p>
                <button onclick="showRouteOnMap('${route._id}')">View on Map</button>
            </div>
        `).join('');

        routesResults.style.display = 'block';
    } catch (error) {
        console.error('Error fetching routes:', error);
    }
}

// Function to show a specific route on the map
async function showRouteOnMap(routeId) {
    try {
        const response = await fetch(`http://localhost:3000/api/routes/${routeId}`);
        const route = await response.json();

        const request = {
            origin: route.startLocation,
            destination: route.endLocation,
            travelMode: google.maps.TravelMode.WALKING
        };

        directionsService.route(request, (result, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(result);
            }
        });
    } catch (error) {
        console.error('Error showing route:', error);
    }
}

// Initialize map when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    
    // Add event listener for the find routes button
    document.getElementById('find-routes').addEventListener('click', calculateRoute);

});

// Utility Functions
function formatNumber(num) {
    return num.toLocaleString();
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}