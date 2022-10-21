import directus from './services.js'
import Big from 'big.js'

class GamblingSystem {
    constructor() {
        this.items =  [
            "Ceremony",
            "Collectivisation",
            "Genre",
            "Petal",
            "Progenitor",
            "Railway",
            "Sophomore",
            "Sustenance",
            "Timber",
            "Walk",
            "Chandelier",
            "Conception",
            "Draw",
            "Eaglet",
            "Gateway",
            "Ketch",
            "Mustard",
            "Pantsuit",
            "Savory",
            "Thermostat",
        ]
        this.rarity = {
            "Common": 0.6,
            "Rare": 0.3,
            "Super Rare": 0.075,
            "Ultra Rare": 0.025,
        }
        this.tally = {
            "Common": 0,
            "Rare": 0,
            "Super Rare": 0,
            "Ultra Rare": 0,
            total: 0,
        }
        this.history = []
    }
    #pity = (value, total) => {
        var calc = (total/60) - 1
        var val = value
        switch (true) {
            case calc % 3 === 0:
                return val * 2
            case calc % 3 === 1:
                return val * 4
            case calc % 3 === 2:
                return val * 8
            default:
                return val
        }
    }
    
    roll = () => {
        var result;
        let i
        var sum = 0;
        var chances = Object.entries(this.rarity);
        var rand = Math.random() * (this.items.length - 0) + 0;
        for (i = 0; i < chances.length; i++) {
            var [key, chance] = chances[i]
            sum += (chance * this.items.length)
            if (this.#pity(rand, this.tally.total) <= sum) {
                this.tally[key] += 1
                this.tally.total += 1
                result = `${key} ${this.items[Math.floor(rand)]}`
                this.history.push({ item: this.items[Math.floor(rand)], rarity: key })
                break
            } 
        }
        return result
    }
    rollOne = () => {
        console.log(this.roll(), this.tally.total)
    }
    rollTen = () => {
        for (var i = 0; i < 10; i++) {
            console.log(this.roll(), this.tally.total)
        }
    }
    rollMultiple = (limit = 2) => {
        for (var i = 0; i < limit; i++) {
            console.log(this.roll(), this.tally.total)
        }
    }
    getHistory = () => {
        console.log(this.history)
    }
}

