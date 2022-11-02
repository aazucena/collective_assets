import fs from 'node:fs'
import moment from 'moment'
import _ from 'lodash'
import data from '@/assets/data/index.json' 

export default class GamblingSystem {
    constructor() {
        this.items =  data.collections
        this.rarity = data.rarity
        this.categories = data.categories
        this.money = data.money
        this.tally = data.tally
        this.history = data.history
    }
    #initData = () => {
        var json = {
            money: this.money,
            rarity: this.rarity,
            categories: this.categories,
            tally: this.tally,
            history: this.history,
            collections: this.items
        }
        fs.writeFileSync('@/assets/data/index.json' , JSON.stringify(json, null, 2))
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
        var chances = Object.entries(this.rarity)
        var rand = Math.random() * (this.items.length - 0) + 0
        for (i = 0; i < chances.length; i++) {
            var [key, data] = chances[i]
            sum += (data.chance * this.items.length)
            if (this.#pity(rand, this.tally.rarity.total) <= sum) {
            
                var filteredItems = this.items.filter(it => it.rarity === key)
                var item = filteredItems[Math.floor(rand) % filteredItems.length]
                this.tally.rarity[key] += 1
                this.tally.rarity.total += 1
                var cat = item.category.split('_').map(s => _.startCase(s)).join(' ')
                var rty = _.startCase(key)
                var name = _.startCase(item.name)
                result = {
                    title: `${rty} ${cat}: ${name}`,
                    data: {
                        ...item, 
                        category: {name: item.category, ...this.categories[item.category]},
                        rarity: {name: item.rarity, ...this.rarity[item.rarity]},
                    }
                }
                this.tally.category[item.category] += 1
                this.tally.category.total += 1

                
                var historyItems = this.history
                    .map((it) => ({ date: it.latest_date, name: it.asset.data.name, rarity: it.asset.data.rarity.name, category: it.asset.data.category.name }))

                var exists = historyItems.length > 0 && !!historyItems.find((hitem) => {
                    return hitem.name === item.name
                        && hitem.rarity === item.rarity
                        && hitem.category === item.category
                })
                if (exists) {
                    money += this.rarity[item.rarity].exchange ?? 0
                }
                this.history.push({ 
                    asset: result, 
                    latest_date: moment().format('YYYY-MM-DD')
                })
                break
            } 
        }
        return result
    }
    rollOne = () => {
        var roll = [this.roll()]
        return roll
    }
    rollTen = () => {
        var rolls = new Array(10).fill(null).map((_, index) => this.roll())
        return rolls
    }
    rollMultiple = (limit = 2) => {
        var rolls = new Array(limit).fill(null).map((_, index) => this.roll())
        return rolls
    }
    pay = () => {
        this.money -= 10
    }
    payTimes = (mod) => {
        this.money -= (10 * mod)
    }
    addMoney = (mod) => {
        this.money = mod
    }
    save = () => {
        this.#initData()
    }
}

