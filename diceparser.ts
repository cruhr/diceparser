const DEFAULT_DICE = '1d6'
const DEFAULT_FACES = 6
const DEFAULT_SEPARATOR = 'D'

type DiceResult = {
  die: string
  result: number
}

type Options = {
  separator: string
  defaultFaces: number
}

const defaultOptions = {
  separator: DEFAULT_SEPARATOR,
  defaultFaces: DEFAULT_FACES,
}

/**
 * Roll one or more dice according to the provided string and optional options.
 * E.g. rollDice('2d10+12')
 * @param str is the dice string to roll (e.g. '2d6+3')
 * @param options are the options to customize the default dice rolling (change the separator from "d" to something else or the default number of sides)
 * @returns
 */
export const rollDice = (
  str: string = DEFAULT_DICE,
  { separator = 'd', defaultFaces = 6 }: Partial<Options> = defaultOptions
) => {
  const tokenizedString = Array.from(str.toLowerCase())

  let sum = 0
  let multiplier = 0
  let currentNumber = ''

  const diceArray: DiceResult[] = []

  /**
   * rolls the dice or adds a flat value to the sum
   */
  const rollOrAdd = (num: number) => {
    if (multiplier) {
      const dice = num || defaultFaces
      for (let i = 0; i < multiplier; i++) {
        const result = Math.ceil(Math.random() * dice)
        sum += result

        diceArray.push({
          die: `${separator.toUpperCase()}${dice}`,
          result,
        })
      }
    }

    // not encountered the "d", the current number is only a stright addition
    if (!multiplier) {
      sum += num
    }
  }

  // loop through each character of the string and perform the according operation
  tokenizedString.forEach((c) => {
    const isNumber = !isNaN(c as any)

    if (c === ' ') {
      // we ignore spaces
    } else if (c === '+') {
      // next dice or addition - roll/add
      rollOrAdd(parseInt(currentNumber, 10))
      // reset temporary values
      multiplier = 0
      currentNumber = ''
    } else if (c === separator.toLowerCase()) {
      // separator between multiplier and dice value
      multiplier = currentNumber.length ? parseInt(currentNumber, 10) : 1
      // reset current number
      currentNumber = ''
    } else if (isNumber) {
      // just a number, add to "current number" string
      currentNumber += c
    } else {
      // encountered not-known character - PANIC!
      throw new Error(
        `Unknown character in dice string "${str}". Please use only numbers, "+" and "${separator}"`
      )
    }
  })

  rollOrAdd(parseInt(currentNumber, 10))

  return {
    sum,
    dice: diceArray,
  }
}
