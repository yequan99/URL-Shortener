const { ValidateURL, GenUniqueUrlCode } = require('../utils/utils')

// Testing ValidateURL Function
describe('ValidateURL', () => {
    // Test Case 1
    test('Test Case 1', () => {
        const longurl = 'www.google.com.sg'
        const expected = true

        expect(ValidateURL(longurl)).toBe(expected)
    })

    // Test Case 2
    test('Test Case 2', () => {
        const longurl = 'https://www.google.com/'
        const expected = true

        expect(ValidateURL(longurl)).toBe(expected)
    })

    // Test Case 3
    test('Test Case 3', () => {
        const longurl = 'wer'
        const expected = false

        expect(ValidateURL(longurl)).toBe(expected)
    })
})


// Testing GenUniqueUrlCode Function
describe('GenUniqueUrlCode', () => {
    // Test Case 1
    // No clash in urlCdoe
    test('Test Case 1', () => {
        const urlArray = ['TGE1ZWGWD']
        const urlCode = '1R0Q7Q5mq'
        const expected = '1R0Q7Q5mq'

        expect(GenUniqueUrlCode(urlArray, urlCode)).toBe(expected)
    })

    // Test Case 2
    test('Test Case 2', () => {
        const urlArray = []
        const urlCode = '1R0Q7Q5mq'
        const expected = '1R0Q7Q5mq'

        expect(GenUniqueUrlCode(urlArray, urlCode)).toBe(expected)
    })
})