/* Imports */
import { weeksArr } from '/weeks.js'

/* Firebase */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://realtime-database-1944c-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const weeksInDB = ref(database, "weeks")

// Variables
const amountInput = document.getElementById('amount-input')
const addBtn = document.getElementById('add-btn')
const msgText = document.getElementById('msg-text')
const weeksSection = document.getElementById('weeks-section')

// Dates
const currentDate = new Date()
const startDate = new Date(currentDate.getFullYear(), 0, 1);
const days = Math.floor((currentDate - startDate) /
    (24 * 60 * 60 * 1000));
    
const weekNumber = Math.ceil(days / 7);

const year = currentDate.getFullYear()
const month = currentDate.getMonth()
const day = currentDate.getDay()


/* Event listeners */

addBtn.addEventListener('click', function(){
    const amount = amountInput.value
    if(amount){
        let activeWeek = weeksArr.filter(function(week){
            return week.active
        })[0]
    
        if(activeWeek){
            const weekId = `${activeWeek.week}-${activeWeek.year}`
            document.getElementById(`${weekId}-spent`).innerHTML += `
            <h3 class="number">${amount}</h3>
            `

            msgText.innerHTML = `<p><strong>Bought for ${amount}.00,-</strong></p>`
        }
    }

})


/* Functions */

function getCurrentDate() {
    const currentDate = new Date().toDateString();
    return currentDate
}

function render(){
    weeksArr.forEach(function(week){
        const isActive = week.active

        const weekId = `${week.week}-${week.year}`

        let weekSpent = ""

        week.spent.forEach(function(amount){
            weekSpent += `
            <h3 class="number">${amount}</h3>
            `
        })

        const weekHTML = `
        <div class="week" id="${weekId}">
            <h1 class="week-num">w${week.week}</h1>
            <div class="week-content">
                <div>
                    <p>2000-1053</p>
                    <h3 class="number">947</p>
                </div>
                <hr>
                <div id="${weekId}-spent">
                    ${weekSpent}
                </div>
            </div>
        </div>
        `

        weeksSection.innerHTML += weekHTML
    })
}


function placeEventListeners(){
    weeksArr.forEach(function(week){
        const weekId = `${week.week}-${week.year}`
        const weekEl = document.getElementById(`${weekId}`)

        weekEl.addEventListener('click', function(e){
            removeActive()
            week.active = true
            weekEl.classList.add('active')
        })
    })
}

function removeActive(){
    weeksArr.forEach(function(week){
        const weekId = `${week.week}-${week.year}`
        const weekEl = document.getElementById(`${weekId}`)

        weekEl.classList.remove('active')
        week.active = false
    })
}


/* Run */
render()
placeEventListeners()



