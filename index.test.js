import { rollDice } from './diceparser'

test('check for result form', () => {
  const result = rollDice('1d')

  expect(result).toHaveProperty('sum')
  expect(result).toHaveProperty('dice')
  expect(result).toHaveProperty('dice[0]result')
  expect(result).toHaveProperty('dice[0]die')
})

test('test default dice rolling', () => {
  const result = rollDice()
  expect(result.sum).toBeGreaterThanOrEqual(1)
  expect(result.sum).toBeLessThanOrEqual(6)
})

test('test default dice rolling with argument', () => {
  const result = rollDice('1d')
  expect(result.sum).toBeGreaterThanOrEqual(1)
  expect(result.sum).toBeLessThanOrEqual(6)
})

test('test dice rolling with face-modifier', () => {
  const result = rollDice('1d2')
  expect(result.sum).toBeGreaterThanOrEqual(1)
  expect(result.sum).toBeLessThanOrEqual(2)
})

test('test dice rolling with separator only', () => {
  const result = rollDice('d')
  expect(result.sum).toBeGreaterThanOrEqual(1)
  expect(result.sum).toBeLessThanOrEqual(6)
})

test('test dice rolling with other default separator', () => {
  const result = rollDice('w', { separator: 'w' })
  expect(result.sum).toBeGreaterThanOrEqual(1)
  expect(result.sum).toBeLessThanOrEqual(6)
})

test('test dice rolling with other default face number', () => {
  const result = rollDice('d', { defaultFaces: 2 })
  expect(result.sum).toBeGreaterThanOrEqual(1)
  expect(result.sum).toBeLessThanOrEqual(2)
})

test('test dice rolling with bonus', () => {
  const result = rollDice('1d+10')
  expect(result.sum).toBeGreaterThanOrEqual(11)
  expect(result.sum).toBeLessThanOrEqual(16)
})

test('test dice rolling with bonus only', () => {
  const result = rollDice('10')
  expect(result.sum).toBe(10)
})

test('test error handling with unknow characters', () => {
  expect(() => rollDice('2w4')).toThrow()
  expect(() => rollDice('2w4-10')).toThrow()
  expect(() => rollDice('2w4aaa')).toThrow()
  expect(() => rollDice('!')).toThrow()
})
