const fs = require('fs')
const readlineSync = require('readline-sync')
const { randomInt } = require('crypto')
const chalk = require('chalk')
let { HANGMAN } = require('./hangman')

// lecture du fichier contenant les mots
let word = fs.readFileSync('./dico.txt', 'utf-8').split('\n')

// variablie permettant de choisir un mot du dico au hasard
const n = randomInt(0, word.length)

let secret = ('_').repeat(word[n].length).split('') // affiche _,_,_,_, à la place du mot secret
let attemps = 7 // nombre d'essaie
let secretWord = word[n].split('')
let hang = 0 // variable permettant d'afficher le dessin du hangMan selon son index

// Game start

while (true) {
  let userInput = readlineSync.question(`Find the secret word:`)

  // boucle permettant au jeu de comprendre que la lettre entrée par l'user soit toujours en minuscule
  for (let i = 0; i < secret.length; i++) {
    if (userInput.toLowerCase() === secretWord[i] || userInput.toUpperCase === secretWord[i]) {
      secret[i] = userInput
    }
  }

  console.log(secret.join(' ').toLowerCase())

  // Caractère déjà taper, caractère sup à 1, erreur: perte de point + affichage du pendu

  if (secret.includes(userInput)) {
    console.log(chalk.green('You already find this character'))
    continue
  } else if (userInput.length > 1) {
    console.log('Only letter required')
    continue
  } else {
    console.log(chalk.red(`Nop, ${attemps - 1} attemps remaining`))
    attemps--
    console.log(HANGMAN[hang])
    hang++
  }

  // fin de partie si atteind
  if (attemps === 0) {
    console.log(chalk.red('Sorry you loose, you will be better next time'))
    break
  }
}
