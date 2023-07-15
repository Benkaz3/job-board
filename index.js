import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-9c0bb-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const jobListingsInDb = ref(database, 'jobListings')

const publishButtonEl = document.getElementById('publish-button')
const jobListingEl = document.getElementById('job-listings')

const jobCompanyEl = document.getElementById('job-company-input')
const jobTitleEl = document.getElementById('job-title-input')
const jobLocationEl = document.getElementById('job-location-input')
const jobDescEl = document.getElementById('job-desc-input')
const jobSalaryEl = document.getElementById('job-salary-input')



publishButtonEl.addEventListener('click', function(){
    const jobListing = {
        company: jobCompanyEl.value,
        title: jobTitleEl.value,
        location: jobLocationEl.value,
        description: jobDescEl.value,
        salary: jobSalaryEl.value
    }
   
    push(jobListingsInDb, jobListing)
    clearInputField()
})

onValue(jobListingsInDb, function(snapshot){
    if(snapshot.exists()){
        let itemArray = Object.entries(snapshot.val())
        clearJobListingEl()
        for (let i = 0; i < itemArray.length; i++){
            let currentItem = itemArray[i]
            let currentItemValue = currentItem[1]
            appendItemToJoblistingEl(currentItemValue)
    }
    }
    else{
        jobListingEl.innerHTML = 'No job listings here... yet'
    }
})

function clearJobListingEl() {
    jobListingEl.innerHTML = ''
}

function clearInputField(){
    jobCompanyEl.value = ''
    jobTitleEl.value = ''
    jobLocationEl.value = ''
    jobDescEl.value = ''
    jobSalaryEl.value = ''
}

function appendItemToJoblistingEl(item){
   let itemValueCompany = item.company
   let itemValueTitle = item.title
   let itemValueLocation = item.location
   let itemValueDescription = item.description
   let itemValueSalary = item.salary
   let newEl = document.createElement('div')
   newEl.classList.add('listing')
   newEl.innerHTML = `
   <div class='card-upper'>
        <div class='job-card-header'>
            <p class='listing-date'>20 May, 2023</p>
            <i class="fa-regular  fa-bookmark"></i>
        </div>
        <div class='job-card-main'>
            <div class="card-main-left">
                <p class="listing-company">${item.company}</p>
                <p class="listing-title">${item.title}</p>
            </div>
        </div>
        <p class="listing-description">${item.description}</p>
    </div>
    
    <div class='job-card-footer'>
        <p class="listing-salary"> ${item.salary}
            <span class='listing-location'>${item.location}</span>
        </p>
        <a href='#' class='details-button'>Details</a>
    </div>
    `

    jobListingEl.append(newEl)

    const buttons = newEl.querySelectorAll('.fa-bookmark')
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            toggleColor(button)
        })
    })
}

function toggleColor(button) {
    if (button.classList.contains('fa-regular')){
        button.classList.remove('fa-regular')
        button.classList.add('fa-solid')
        button.style.color = '#6b62e6'
    }
    else {
        button.classList.remove('fa-solid')
        button.style.color = 'black'
        button.classList.add('fa-regular')
    }
}

