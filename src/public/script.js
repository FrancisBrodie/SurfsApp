
const multiStepForm = document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
let currentStep = formSteps.findIndex(step => {
    return step.classList.contains('active')
})

if (currentStep < 0) {
    currentStep = 0
    formSteps[currentStep].classList.add('active')
    showCurrentStep()
}

multiStepForm.addEventListener("click", e => {
    let incrementor
    if (!(e.target instanceof HTMLElement)) return
    if (e.target.matches("[data-next]")) {
        incrementor = 1
    } else if (e.target.matches("[data-previous]")) {
        incrementor = -1
    }

    if (incrementor == null) return

    const inputs = [...formSteps[currentStep].querySelectorAll('input')]
    const allValid = inputs.every(input => input.reportValidity())
    if (allValid) {
        currentStep += incrementor
        showCurrentStep()
    }
})

formSteps.forEach(step => {
    step.addEventListener("animationend", (e) => {
        formSteps[currentStep].classList.remove('hide')
        e.target.classList.toggle('hide', !e.target.classList.contains('active'))
    })
})

function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const selectDrop = document.getElementById('countries')

    fetch('https://restcountries.com/v3.1/all').then(res => {
        return res.json();
    }).then(data => {
        let output = "";
        data.forEach(country => {
            output += `<option value="${country.name.common}">${country.name.common}</option>`;
        })

        selectDrop.innerHTML = output;

    }).catch(error => {
        console.log(error);
    })
})
