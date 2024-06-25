# Diceparser

## Installation

Simply run `npm install @cruhr/diceparser` in your npm project.

However I personally would advise to just download the diceparser.js or diceparser.ts and include it in your project.
This way you can extend and change the libraries to your needs and you will never run into problems with breaking changes or disappearing dependencies.

## Dice notation

A small explainer what "dice notation" means: If you want to describe how many and what kind of dice to roll, you can
rely on a defacto standard notation which describes the number of dice, the faces they have and if there is a bonus applied.

Example:

```
2d10+1
```

This translates to "2 dice with 10 faces each plus 1".  
So the number in front of the `d` describes the dice count, the number immediately after the `d` the number of faces and
any bonus will be added with a `+X`.

## Usage

You can just pass any string of the standard dice notation to the rollDice function and get an object back with the overall result and the individual dice.

```JS
import { rollDice } from '@cruhr/diceparser'

const result = rollDice('2d6+2')

// The result will be an object of the following notation:
{
   sum: number, // something between 4 and 14
   dice: [{
     die: string // 1d6
     result: // between 1 and 6
   }, {
     die: string // 1d6
     result: // between 1 and 6
   }],
 }
```

## Recognized strings

A few examples of valid function calls:

```JS
rollDice()
rollDice('d')
rollDice('2d')
rollDice('d20')
rollDice('3d3+2')
rollDice('1')
rollDice('12+1d12+5+6d')
```

## Options

You can optionally pass an object of options as a second parameter to the rollDice function.

### separator (string)

The separator between dice count and dice faces. The default is `d`.

```JS
rollDice('2w20', { separator: 'w' }) // parse a string in German dice notation
```

### defaultFaces (number)

The separator between dice count and dice faces. The default is `d`.

```JS
rollDice('2d', { defaultFaces: 20 }) // automatically roll a d20 if the number of faces is not defined
```
