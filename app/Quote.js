export class Quote {
    constructor(text) {
        this.text = text;
        //tablica liter odgadniętych
        this.guessed = [];
    }

    getContent() {
        let content = '';
        //wpisywanie podkreślników w miejscu liter oraz liter w odpowiednich miejscach na podstawie wybranej 
        for (const char of this.text) {
            if (char == ' ' || this.guessed.includes(char)) {
                content += char;
            } else {
                content += '_';
            }
        }
        return content;
    }

    //metoda sprawdzająca, czy wybrana liczba zawiera się w haśle
    guess(letter) {
        if (!this.text.includes(letter)) {
            return false;
        }
        //dopisanie do odgadniętych liter
        this.guessed.push(letter)
        return true;
    }
}