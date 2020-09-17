import {
    Quote
} from './Quote.js'

class Game {

    //obsługa stanów 
    currentStep = 0;
    lastStep = 7;

    //tablica obiektów, będących możliwymi hasłami do odgadnięcia 
    quotes = [{
        text: 'pan tadeusz',
        category: 'Utwór Literacki'
    }, {
        text: 'janko muzykant',
        category: 'Utwór Literacki'
    }, {
        text: 'akademia pana kleksa',
        category: 'Film'
    }, {
        text: 'ogniem i mieczem',
        category: 'Film'
    }]

    //pobranie w konstruktorze przekazanych danych 
    constructor({
        lettersWrapper,
        categoryWrapper,
        wordWrapper,
        outputWrapper
    }) {
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;

        //wybór i przypisanie kategorii do jej wrappera
        const {
            text,
            category
        } = this.quotes[Math.floor(Math.random() * this.quotes.length)]
        this.categoryWrapper = category;
        this.quote = new Quote(text);

    }

    //obsługa użytej litery 
    guess(letter, event) {
        //wyłączenie buttona po użyciu
        event.target.disabled = true;
        if (this.quote.guess(letter)) {
            // dopisanie wartości we wrapperze 
            this.drawQuote();
        } else {
            //zmiana stanu w przypadku nieodgadnięcia litery 
            this.currentStep++;
            document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
            if (this.currentStep == this.lastStep) {
                this.loosing();
            }
        }
        //ponowne dopisanie wartości we wrapperze 

    }

    drawLetters() {
        //tworzenie "klawiatury"
        for (let i = 0; i < 26; i++) {
            //iteracja po kolejnych indexach, 36 bierze się stąd, że pozwala na reprezentację liter(jedną z 26) z alfabetu łacińskiego (defową wartością jest 10, które odpowiada systemowi dziesiętnemu, stąd nie 26 a 36)
            const label = (i + 10).toString(36)
            //tworzenie buttona i dodanie go do wrapera
            const button = document.createElement('button')
            button.innerHTML = label;
            //obsługa kliknięcia, tak, żeby zapisywana była litera którą wybieram, event dodany po to, żeby móc użyć disabled na wybranym już buttonie
            button.addEventListener('click', (event) => this.guess(label, event))
            this.lettersWrapper.appendChild(button)
        }
    }

    drawQuote() {
        //pobranie zawartości quote i umieszczenie go we wrapperze
        const content = this.quote.getContent();
        this.wordWrapper.innerHTML = content;
        if (!content.includes('_')) {
            this.winning();
        }
    }
    start() {
        //obsługa stanu, poprzez wybór startowej pozycji i zmianę opacity
        document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
        this.drawLetters();
        this.drawQuote();

    }
    //obsługa końca wygranka
    winning() {
        this.wordWrapper.innerHTML = 'Gratulacje, wygrywasz!'
        this.lettersWrapper.innerHTML = '';
    }
    //obsługa końca przegranka
    loosing() {
        this.wordWrapper.innerHTML = 'Przegranko jest Twoje'
        this.lettersWrapper.innerHTML = '';

    }
}

//pobranie danych do nowej gry z DOM w postaci obiektu
const game = new Game({
    lettersWrapper: document.getElementById("letters"),
    categoryWrapper: document.getElementById("category"),
    wordWrapper: document.getElementById("word"),
    outputWrapper: document.getElementById("output"),
});
//inicjalizacja startu
game.start();