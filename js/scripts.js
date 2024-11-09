// Objetos

const generateBtn = document.querySelector("#generate-password")
const generatedPasswordEl = document.querySelector("#generated-password")
const openGenerateBtn = document.querySelector("#open-generate-password")
const optionsContainer = document.querySelector("#generate-options")
const registerContainer = document.querySelector("#register-container")
const lettersCheck = document.querySelector("#letters")
const lenghtInput = document.querySelector("#lenght")
const numbersCheck = document.querySelector("#numbers")
const symbolsCheck = document.querySelector("#symbols")
const copyPasswordBtn = document.querySelector("#copy-password")


// Funções

function getLetterLowerCase() {
    return String.fromCharCode(Math.floor(Math.random() *26) + 97)
}

function getLetterUpperCase() {
    return String.fromCharCode(Math.floor(Math.random() *26) + 65)
}

function getNumber() {
    return Math.floor(Math.random() * 10).toString()
}

function getSymbol() {
    const symbols = "!@#$%^&*()=-{}[]/.,<>+_"
    return symbols[Math.floor(Math.random()*symbols.length)]
}


function generatePassword (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) {
    let password = ""

    const passwordLength = Number(lenghtInput.value)

    const generators = []
    if (lettersCheck.checked) {
        generators.push(getLetterLowerCase)
        generators.push(getLetterUpperCase)
    }
    if (numbersCheck.checked) {
        generators.push(getNumber)
    }
    if (symbolsCheck.checked) {
        generators.push(getSymbol)
    }
    if(!generators.length) {
        alert("Selecione uma opção para a criação de senha")
        return
    }

    for(i=0; i<passwordLength; i = i+ generators.length) {
        generators.forEach(() =>{

            const randomValue = generators[Math.floor(Math.random()*generators.length)]()

            password += randomValue

        })
    }
    password = password.slice(0,passwordLength)
    generatedPasswordEl.style.display = "block"
    generatedPasswordEl.querySelector("h4").innerText = password
}

// Eventos

generateBtn.addEventListener("click", () => {
    generatePassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol)
})

openGenerateBtn.addEventListener("click", () => {
    optionsContainer.classList.toggle("hide")
    let text = registerContainer.querySelector("#open-generate-password").innerText
    if (text == "Clique aqui."){
        registerContainer.querySelector("#open-generate-password").innerText = "Fechar"
        
    }else {
        registerContainer.querySelector("#open-generate-password").innerText = "Clique aqui."
    }
})

copyPasswordBtn.addEventListener("click", (e) =>{

    e.preventDefault()
    let text = generatedPasswordEl.querySelector("h4").innerText
    navigator.clipboard.writeText(text).then(() =>{
        copyPasswordBtn.innerText = "Copiado com sucesso"
    })
    setTimeout (() =>{
        copyPasswordBtn.innerText = "Copiar"
    },600)

})


