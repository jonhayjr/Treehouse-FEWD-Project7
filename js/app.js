const alertBanner = document.querySelector('#alert');

//Create the HTML for the banner   
alertBanner.innerHTML =
`
<div class="alert-banner">
    <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete.</p>
    <p class="alert-banner-close">x</p>
</div>
`

//Alert Banner Event Listener
alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = "none"
    }
});

//Traffic Chart  
const trafficCanvas = document.querySelector('#traffic-chart');
const hourlyTraffic = [150, 300, 350, 500, 300, 400, 300, 450, 650, 300,
    2500];
 const dailyTraffic = [350, 650, 500, 1000, 750, 950, 600, 900, 1100, 750,
    1500];
const weeklyTraffic = [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
    2500];

const monthlyTraffic = [1000, 2100, 1200, 2300, 1700, 1890, 1500, 2000, 2200, 1760,
        2500];
const trafficNav = document.querySelector('.traffic-nav');

let trafficData = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
    "4-10", "11-17", "18-24", "25-31"],
    datasets: [{
    data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
    2500],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1,
    }]
    };

let trafficOptions = {
    aspectRatio: 2.5,
    animation: {
    duration: 0
    },
    scales: {
    yAxes: [{
    ticks: {
    beginAtZero:true
    }
    }]
    },
    legend : {
    display: false
    }
    };

let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
    });

//Update Traffic Chart Based on User Selection
function updateTrafficFrequency(frequency) {
        if (frequency === 'Hourly') {
            trafficData.datasets[0].data = hourlyTraffic;
        } else if (frequency === 'Daily') {
            trafficData.datasets[0].data = dailyTraffic;
        } else if (frequency === 'Weekly') {
            trafficData.datasets[0].data = weeklyTraffic;
        } else if (frequency === 'Monthly') {
            trafficData.datasets[0].data = monthlyTraffic;
        }
    
        trafficChart = new Chart(trafficCanvas, {
            type: 'line',
            data: trafficData,
            options: trafficOptions
            });
}

function addActiveClass(element) {
    const currentActive = document.querySelector('.active');
    //Remove Active Class 
    currentActive.classList.remove('active');
    //Add Class To Current Item  
    element.classList.toggle('active'); 
}

//Grab User Selection
function selectTrafficFrequency(event) {
    const element = event.target;
    const classList = event.target.classList.value;
    if (classList.includes('traffic-nav-link')) {
        let frequency = event.target.innerText;
        //Add Active Class
        addActiveClass(element);
        //Update Chart
        updateTrafficFrequency(frequency);
    }
}

trafficNav.addEventListener('click', selectTrafficFrequency);
//Daily Chart  
const dailyCanvas = document.getElementById("daily-chart");

// data for daily traffic bar chart
const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
    label: '# of Hits',
    data: [75, 115, 175, 125, 225, 200, 100],
    backgroundColor: '#7477BF',
    borderWidth: 1
    }]
    };
    const dailyOptions = {
    scales: {
    yAxes: [{
    ticks: {
    beginAtZero:true
    }
    }]
    },
    legend : {
    display: false
    }
        }

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
    });

//Mobile Chart   
const mobileCanvas = document.getElementById("mobile-chart");

const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
    label: '# of Users',
    data: [2000, 550, 500],
    borderWidth: 0,
    backgroundColor: [
    '#7477BF',
    '#78CF82',
    '#51B6C8'
    ]
    }]
    };

const mobileOptions = {
    legend: {
    position: 'right',
    labels: {
    boxWidth: 20,
    fontStyle: 'bold'
    }
    }
    }

let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
    });

//Messaging Section   
const user = document.querySelector('#userField');
const message = document.querySelector('#messageField');
const send = document.querySelector('#send');

send.addEventListener('click', () => {
    // ensure user and message fields are filled out
    if (user.value === "" && message.value === "") {
    alert("Please fill out user and message fields before sending");
    } else if (user.value === "" ) {
    alert("Please fill out user field before sending");
    } else if (message.value === "" ) {
    alert("Please fill out message field before sending");
    } else {
    alert(`Message successfully sent to: ${user.value}`);
    }
    });

//Notification dropdown   
const notificationDropdown = document.querySelector('.notification-dropdown');
const notificationBell = document.querySelector('#notification-bell')
const notificationAlertDot = document.querySelector('.dot');
const bell = document.querySelector('.bell');


function showNotifications(event) {
    if (event.target.id === 'notification-bell') {
        notificationDropdown.classList.toggle('show');
        //Remove green alert dot
        notificationAlertDot.style.display = 'none';
    } else {
        notificationDropdown.classList.remove('show');
    }
}

bell.addEventListener ('click', showNotifications);


//User Search Logic  
const userField = document.getElementById('userField');
const userNames = ['Dawn Wood', 'Dale Byrd', 'Dan Oliver', 'Victoria Chambers', 'Ryan Dudley', 'Benjamin Moore', 'Rhiannon Johnson', 'Brian Leslie', 'Catherine Jones', 'Bradley Stevenson', 'Chris Stizler'];
const autocompleteDropdown = document.querySelector('.autocomplete-dropdown'); 

//Creates hidden list of user names
function createListItems(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.innerText= arr[i];
        li.style.display = 'none';
        autocompleteDropdown.appendChild(li);
    }
}

createListItems(userNames);

//Autocomplete Function
function autoComplete() {
    const inputValue = userField.value;
    const inputLength = inputValue.length;
    const autocompleteDropdownLI = document.querySelectorAll('.autocomplete-dropdown > li');

    for (let i = 0; i < userNames.length; i++) {
        let dropdown = autocompleteDropdownLI[i];
        let dropdownText = dropdown.innerText;
        let dropdownLength = dropdown.length;
        let subVal = dropdownText.substr(0, inputLength);

        if (subVal.toLowerCase() === inputValue.toLowerCase() && inputValue.charAt(0) !== '') {
            //Makes input text bold
            const boldText = `<strong>${subVal}</strong>`;
            const unboldText = dropdownText.replace(subVal, '');
            dropdown.innerHTML = boldText + unboldText;
            autocompleteDropdownLI[i].style.display = '';
        } else {
            autocompleteDropdownLI[i].style.display = 'none';
        }
    }
}

//Update input field if user selects dropdown value
function updateInput(e) {
    if (e.target.nodeName === 'LI') {
        userField.value = e.target.innerText;
        closeDropdownList(e);
    }
}

//Closes dropdown list
function closeDropdownList(e) {
    const listItems = document.querySelectorAll('.autocomplete-dropdown > li');
    for(let i = 0; i < listItems.length; i++) {
        listItems[i].style.display = 'none';
    }
}

autocompleteDropdown.addEventListener('click', updateInput);

userField.addEventListener('keyup', autoComplete);

//If user clicks in input field, dropdown appears
userField.addEventListener('click', autoComplete);


//If user clicks out of input field, dropdown is hidden
window.addEventListener('click', (e) => {
    if (e.target.id !== 'userField') {
        closeDropdownList(e);
    }
})

window.addEventListener('touchstart', (e) => {
    if (e.target.id !== 'userField') {
        closeDropdownList(e);
    }
})

//User Settings  
const sendEmail = document.querySelector('#sendEmail');
const setPublic = document.querySelector('#setPublic');
const setTimezone = document.querySelector('#timezone');
const saveButton = document.querySelector('#save');
const cancelButton = document.querySelector('#cancel');  


function saveSettings() {
const sendEmailValue = sendEmail.checked ? true : false;
const setPublicValue = setPublic.checked ? true : false;
const setTimezoneValue = setTimezone.value;
//Save to local Storage
localStorage.setItem('sendEmail', JSON.stringify(sendEmailValue));
localStorage.setItem('setPublic', JSON.stringify(setPublicValue));
localStorage.setItem('setTimezone', JSON.stringify(setTimezoneValue));
}

function getSettings() {
    //Get Local Storage Settings
    const sendEmailValue = JSON.parse(localStorage.getItem('sendEmail'));
    const setPublicValue = JSON.parse(localStorage.getItem ('setPublic'));
    const setTimezoneValue = JSON.parse(localStorage.getItem('setTimezone'));

    //Update Settings Values
    sendEmail.checked = sendEmailValue;
    setPublic.checked = setPublicValue;
    setTimezone.value = setTimezoneValue;
}

function clearSettings() {
    //Clear Local Storage 
    localStorage.removeItem('sendEmail');
    localStorage.removeItem('setPublic');
    localStorage.removeItem('setTimezone');

    //Update settings to default values  
    sendEmail.checked = true;
    setPublic.checked = true;
    setTimezone.value = 'Select a Timezone';
}

saveButton.addEventListener('click', saveSettings);
document.addEventListener('DOMContentLoaded', getSettings);
cancelButton.addEventListener('click', clearSettings);

