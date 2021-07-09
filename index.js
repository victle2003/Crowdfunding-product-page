const modalContainer = document.getElementById("modalContainer")
const modal = document.getElementById("modal")
const modalCloseButton = document.getElementById("modalCloseButton")

const bookmark = document.getElementById("bookmark")
const bookmarkCircle = document.getElementById("bookmarkCircle")
const bookmarkTag = document.getElementById("bookmarkTag")
const bookmarkText = document.getElementById("bookmarkText")

let backedMoney = 89914
let goalMoney = 100000
let totalBackers = 5007

let CTAs = []
let radioInputs = []
let modalFooters = []
let pledgeInputs = []

for(let i = 0; i < document.getElementsByClassName("selectReward").length; i++) {
    CTAs.push(document.getElementsByClassName("selectReward")[i])
    CTAs[i].addEventListener("click", () => {toggleModal(i)})
}

for(let i = 0; i < document.getElementsByClassName("radio").length; i++) {
    radioInputs.push(document.getElementsByClassName("radio")[i])
    radioInputs[i].addEventListener("click", () => {selectModalProduct(i)})
}

for(let i = 0; i < document.getElementsByClassName("modalProductFooter").length; i++) {
    modalFooters.push(document.getElementsByClassName("modalProductFooter")[i])
}

for(let i = 0; i < document.getElementsByClassName("pledgeInput").length; i++) {
    pledgeInputs.push(document.getElementsByClassName("pledgeInput")[i])
    setInputFilter(pledgeInputs[i], function(value) {
        return /^\d*$/.test(value) && (value === "" || parseInt(value) <= 999 && parseInt(value) >= 1); })
}

// -----------------------Functions-----------------------

function toggleModal(elementIndex) {

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

// -----------------Event listeners-----------------------

modalCloseButton.addEventListener("click", () => {toggleModal(0)})

bookmark.addEventListener("click", () => {
    if(bookmark.classList.contains("notBookmarked")) {
        bookmark.classList.replace("notBookmarked", "bookmarked")
        bookmarkCircle.style.fill = "var(--dark-cyan)"
        bookmarkTag.style.fill = "white"
        bookmarkText.style.color = "var(--dark-cyan)"
        bookmarkText.innerText = "Bookmarked" 
    } else {
        bookmark.classList.replace("bookmarked", "notBookmarked")
        bookmarkCircle.style.fill = "#2F2F2F"
        bookmarkTag.style.fill = "#B1B1B1"
        bookmarkText.style.color = "var(--dark-gray)"
        bookmarkText.innerText = "Bookmark"
    }
})