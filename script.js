const path = require('path')
const Papa = require('papaparse')
const fs = require('fs')
const write = require('write')

const allowed = ['an', 'a', 'by', 'on', 'the', 'in', 'at', 'of']

const locationOfFile = path.resolve(__dirname, 'camps copy.csv')
const content = fs.readFileSync(locationOfFile, { encoding: 'utf-8'})

const result = Papa.parse(content)

const names = result.data.map(item => item[1])

const capitalizeFirstLetter = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

const fixedNames = names.map(name => {
    const wordsInName = name.split(' ')
    let newName = ''
    wordsInName.forEach((w, index) => {

        let word = w

        if (word === word.toUpperCase() && word.length > 1) {
            word = capitalizeFirstLetter(word.toLowerCase())
        }

        if (index === 0) { newName += capitalizeFirstLetter(word) }



        else if (allowed.includes(word)) {
            newName += word.toLowerCase()
        }
        else {
            newName += capitalizeFirstLetter(word)
        }


        if (index + 1 !== wordsInName.length) {
            newName += ' '
        }




    })
    return newName
})


let finalText = ``

fixedNames.forEach(name => {
    finalText += name
    finalText += "\n"
})

const pathToWriteTo = path.resolve(__dirname, 'result.txt')

write.sync(pathToWriteTo, finalText)
