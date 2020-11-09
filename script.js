/**
 * This array stores all the doctors from GET request.
 * @Type - Array
 */

let doctors = [];

/**
 * GET request from server
 */

const BASE_SERVER_URL = 'http://tim-kuntze.developerakademie.com/app_doctorsapp/'; // Place of the backend

/**
 * Loads myJSON from Server
 */
function load() {
    updateStatus('');
    loadJSONFromServer()
        .then(function(result) {

            doctors = JSON.parse(result);

            updateStatus('');
            displayDoctorList();
        })
        .catch(function(error) {
            updateStatus('Loading error');
            console.error('error', error);

        });
}

/**
 * Loads a JSON or JSON Array to the Server
 * payload {JSON | Array} - The payload you want to store
 */

function loadJSONFromServer() {
    return new Promise(function(resolve, reject) {
        let xhttp = new XMLHttpRequest();
        let proxy = determineProxySettings();
        let serverURL = proxy + BASE_SERVER_URL + 'doctors.json';
        xhttp.open('GET', serverURL);

        xhttp.onreadystatechange = function(oEvent) {
            if (xhttp.readyState === 4) {
                if (xhttp.status >= 200 && xhttp.status <= 399) {
                    resolve(xhttp.responseText);
                } else {
                    reject(xhttp.statusText);
                }
            }
        };
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send();
    });
}

function updateStatus(status) {
    result.innerHTML = status;
}

function determineProxySettings() {
    if (window.location.href.indexOf('.developerakademie.com') > -1) {
        return '';
    } else {
        return 'https://cors-anywhere.herokuapp.com/';
    }
}


/**
 * //*Displaying of doctors list.
 * @function
 */

function displayDoctorList() {

    for (let id = 0; id < doctors.length; id++) {
        //let openingHours = JSON.parse(doctors[id].opening_hours);
        let listDoctors = `<div class="doctors-list">
        <div class="picture-section"><div class="image" id="image"><img src="${doctors[id].img}"></div></div>
        <div class="info-section"><div class="info"><div class="title" id="title">${doctors[id].title}</div>
        <div class="name" id="name">${doctors[id].first_name + '&nbsp;' + doctors[id].last_name}</div>
        <div class="specialities" id="specialities">${doctors[id].specialities}</div>
        <div class="street" id="streets">${doctors[id].street}</div>
        <div class="zipcode" id="zipcode">${doctors[id].zipcode + '&nbsp;' + doctors[id].city}</div></div> 
        <div class="buttons"><div class="date-button"><img src="img/date-to-128.png"><span>Schedule appointment</span></div>
        <div class="details-button"><img src="img/view-details-128.png"><span>Go to doctor's profile</span></div></div></div>
        <div class="opening-section"><div class="opening_hours" id="opening_hours">
            <div>Monday: ${doctors[id].opening_hours.monday}</div>
            <div>Tuesday: ${doctors[id].opening_hours.tuesday}</div>
            <div>Wednesday: ${doctors[id].opening_hours.wednesday}</div>
            <div>Thursday: ${doctors[id].opening_hours.thursday}</div>
            <div>Friday: ${doctors[id].opening_hours.friday}</div>
            <div>Saturday: ${doctors[id].opening_hours.saturday}</div>
            <div>Sunday: ${doctors[id].opening_hours.sunday}</div>
        </div></div>
        </div>`;
        document.getElementById('list').insertAdjacentHTML('beforeend', listDoctors);
    }

}