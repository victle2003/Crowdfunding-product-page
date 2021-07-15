const modalContainer = document.getElementById("modalContainer")
const modal = document.getElementById("modal")
const modalDefault = document.querySelector(".modalDefault")
const modalCompleted = document.querySelector(".modalCompleted")
const modalCloseButton = document.getElementById("modalCloseButton")
const modalCompletedCloseButton = document.getElementById("modalCompletedCloseButton")
const form = document.getElementById("form")
const bookmark = document.getElementById("bookmark")

const stats = {
    backedMoney: 89914,
    goalMoney: 100000,
    totalBackers: 5007
}

const rewardsLeft = {
    bambooLeft: 101,
    blackEditionLeft: 64,
    mahoganyLeft: 0
}

const rewardsLeftNumbers = Object.values(rewardsLeft)
const rewardsLeftNames = Object.keys(rewardsLeft)

const pledgeMinValues = {
    noRewardPledge: 1,
    bambooPledge: 25,
    blackEditionPledge: 75,
    mahoganyPledge: 200
}

const pledgeMinValuesNumbers = Object.values(pledgeMinValues)

let CTAs = []

for(let i = 0; i < document.getElementsByClassName("selectReward").length; i++) {
    CTAs.push(document.getElementsByClassName("selectReward")[i])
    CTAs[i].addEventListener("click", () => {toggleModal(i)})
}

let radioInputs = []

for(let i = 0; i < document.getElementsByClassName("radio").length; i++) {
    radioInputs.push(document.getElementsByClassName("radio")[i])
    radioInputs[i].addEventListener("click", () => {selectModalProduct(i)})
    radioInputs[i].addEventListener("click", () => {fillInputValues()})
}

let submitButtons = []

for(let i = 0; i < document.getElementsByClassName("submit").length -1; i++) {
    submitButtons.push(document.getElementsByClassName("submit")[i])
    submitButtons[i].addEventListener("click", () => {pledgeReward(i)})
}

let pledgeInputs = document.querySelectorAll(".pledgeInput")

pledgeInputs.forEach(inputs => {
    setInputFilter(inputs, function(value) {
        return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 999 && parseInt(value) >= 1); })
    inputs.addEventListener("keyup", () => {validateInput(inputs)})
})

let modalFooters = document.querySelectorAll(".modalProductFooter")

fillInputValues()
updateProductAvailability()
// -----------------------Functions----------------------- //

function toggleModal(elementIndex) {

    if (elementIndex === -1) {
        modalContainer.style.backgroundColor = "rgba(0,0,0,0)"
        modal.style.transform = "translate(0, -100px)"
        modal.style.filter = "opacity(0)"
        document.body.style.overflowY = "scroll"

        setTimeout(() => {
            modalContainer.className = "modalContainerClosed"
            modal.classList.add("modalDefaultContainer")
            modal.classList.remove("modalCompletedContainer")
            modalDefault.classList.add("modalDefaultOpened")
            modalDefault.classList.remove("modalDefaultClosed")
            modalCompleted.classList.add("modalCompletedClosed")
            modalCompleted.classList.remove("modalCompletedOpened")
        }, 200)
    } else {
        modal.classList.add("modalDefaultContainer")
        modal.classList.remove("modalCompletedContainer")
        modalDefault.classList.add("modalDefaultOpened")
        modalDefault.classList.remove("modalDefaultClosed")
        modalCompleted.classList.add("modalCompletedClosed")
        modalCompleted.classList.remove("modalCompletedOpened")

        if(modalContainer.className == "modalContainerClosed") {
            modalContainer.className = "modalContainerOpened"
            modalContainer.scroll(0, 0)
            document.body.style.overflowY = "hidden"

            setTimeout(() => {
                modalContainer.style.backgroundColor = "rgba(0,0,0,0.5)"
                modal.style.transform = "translate(0, 0)"
                modal.style.filter = "opacity(1)" 
            }, 1)

        } else {
            modalContainer.style.backgroundColor = "rgba(0,0,0,0)"
            modal.style.transform = "translate(0, -100px)"
            modal.style.filter = "opacity(0)"
            document.body.style.overflowY = "scroll"

            setTimeout(() => {
                modalContainer.className = "modalContainerClosed"
            }, 200)
        }
        selectModalProduct(elementIndex)
    }
}

function selectModalProduct(radioIndex) {
    for(let i = 0; i < document.getElementsByClassName("modalProductFooter").length; i++) {
        document.getElementsByClassName("radio")[i].checked = false
        modalFooters[i].style.display = "none"
        document.getElementsByClassName("modalProduct")[i].style.border = "1px solid var(--inner-gray)"
    }
    document.getElementsByClassName("radio")[radioIndex].checked = true
    modalFooters[radioIndex].style.display = "flex"
    document.getElementsByClassName("modalProduct")[radioIndex].style.border = "3px solid var(--moderate-cyan)"
}

function fillInputValues() {
    for (let i = 0; i < pledgeInputs.length; i++) {
        if (pledgeInputs[i].value < pledgeMinValuesNumbers[i]) {
            pledgeInputs[i].value = pledgeMinValuesNumbers[i]
            validateInput(pledgeInputs[i])
        }
    }
}

function toggleButtonAvailability(inputId, pledge, btnClass) {
    
    if (inputId.value >= pledge) {
        document.getElementById(`${btnClass}Submit`).disabled = false
        document.getElementById(`${btnClass}Submit`).classList.add("CTAenabled")
        document.getElementById(`${btnClass}Submit`).classList.remove("CTAdisabled")
    } else {
        document.getElementById(`${btnClass}Submit`).disabled = true
        document.getElementById(`${btnClass}Submit`).classList.add("CTAdisabled")
        document.getElementById(`${btnClass}Submit`).classList.remove("CTAenabled")
    }
}

function validateInput(inputId) {
    switch(inputId.id) {
        
        case "noRewardPledge": 
            toggleButtonAvailability(inputId, pledgeMinValues.noRewardPledge, "noReward")
        break;

        case "bambooPledge": 
            toggleButtonAvailability(inputId, pledgeMinValues.bambooPledge, "bamboo")
        break;

        case "blackEditionPledge": 
            toggleButtonAvailability(inputId, pledgeMinValues.blackEditionPledge, "blackEdition")
        break;

        case "mahoganyPledge": 
            toggleButtonAvailability(inputId, pledgeMinValues.mahoganyPledge, "mahogany")
        break;
    }
}

function updateProductAvailability() {
    let n = (document.getElementsByClassName("limitedProduct").length / 2)
    for (let i = 0; i < n; i++) {
        if (rewardsLeftNumbers[i] === 0) {
            document.getElementsByClassName("limitedProduct")[i].style.filter = "opacity(0.4)"
            document.getElementsByClassName("limitedProduct")[i].style.pointerEvents = "none"
            document.getElementsByClassName("limitedProduct")[i+n].style.filter = "opacity(0.4)"
            document.getElementsByClassName("limitedProduct")[i+n].style.pointerEvents = "none"
        }
    } 
}

function pledgeReward(submitValueIndex) {
    
    modal.style.transform = "translate(0, -100px)"
    modal.style.filter = "opacity(0)"

    setTimeout(() => {
        modal.classList.replace("modalDefaultContainer", "modalCompletedContainer")
        modalDefault.classList.add("modalDefaultClosed")
        modalDefault.classList.remove("modalDefaultOpened")
        modalCompleted.classList.add("modalCompletedOpened")
        modalCompleted.classList.remove("modalCompletedClosed")
        modal.style.transform = "translate(0, 0)"
        modal.style.filter = "opacity(1)"
    }, 200)

    stats.backedMoney += (parseInt(pledgeInputs[submitValueIndex].value))
    document.getElementById("backedMoney").innerText = addCommas(stats.backedMoney)

    stats.totalBackers += 1
    document.getElementById("totalBackers").innerText = addCommas(stats.totalBackers)

    rewardsLeftNumbers[submitValueIndex - 1] = (rewardsLeftNumbers[submitValueIndex - 1] - 1)
    for (let i = 0; i < document.getElementsByClassName(`${rewardsLeftNames[submitValueIndex - 1]}`).length; i++) {
        document.getElementsByClassName(`${rewardsLeftNames[submitValueIndex - 1]}`)[i].innerText = rewardsLeftNumbers[submitValueIndex - 1]
    }

    document.getElementById("progressBar").style.width = `${(stats.backedMoney/stats.goalMoney)*100}%`
    updateProductAvailability()
}

function addCommas(number) {
	number += '';
	x = number.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

// -----------------Added Event listeners-----------------------

modalCloseButton.addEventListener("click", () => {toggleModal(-1)})
modalCompletedCloseButton.addEventListener("click", () => {toggleModal(-1)})

bookmark.addEventListener("click", () => {
    if(bookmark.classList.contains("notBookmarked")) {
        bookmark.classList.replace("notBookmarked", "bookmarked")
        document.getElementById("bookmarkCircle").style.fill = "var(--dark-cyan)"
        document.getElementById("bookmarkTag").style.fill = "white"
        document.getElementById("bookmarkText").style.color = "var(--dark-cyan)"
        document.getElementById("bookmarkText").innerText = "Bookmarked" 
    } else {
        bookmark.classList.replace("bookmarked", "notBookmarked")
        document.getElementById("bookmarkCircle").style.fill = "#2F2F2F"
        document.getElementById("bookmarkTag").style.fill = "#B1B1B1"
        document.getElementById("bookmarkText").style.color = "var(--dark-gray)"
        document.getElementById("bookmarkText").innerText = "Bookmark"
    }
})

form.addEventListener("submit", e => {
    e.preventDefault()
})