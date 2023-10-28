const amountInput = document.getElementById('amount-input')
const addBtn = document.getElementById('add-btn')
const msgText = document.getElementById('msg-text')


/* Event listeners */

addBtn.addEventListener('click', function(){
    renderCurrentDate()

    const amount = amountInput.value
    msgText.innerHTML += `<p><strong>Bought for ${amount}.00,-</strong></p>`
})


/* Functions */

function getCurrentDate() {
    const currentDate = new Date().toDateString();
    return currentDate
}


function renderCurrentDate() {
    const currentDate = getCurrentDate()
    msgText.innerHTML = `<p>${currentDate}</p>`
}


/* Run */

renderCurrentDate()