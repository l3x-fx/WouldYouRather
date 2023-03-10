import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe('saveQuestion', () => {
    it('will return the poll object if resoved', async() => {
        const validObject = {optionOneText:'text1', optionTwoText:'text2', author: 'abcdef'}

        const result = await _saveQuestion(validObject)

        expect(result.optionOne.text).toMatch(validObject.optionOneText)
        expect(result.optionTwo.text).toMatch(validObject.optionTwoText)
        expect(result.author).toMatch(validObject.author)
    })

    it('will throw an error if rejected', async() => {
        const invalidObject = {optionTwoText:'text2', author: 'abcdef'}

        await expect(_saveQuestion(invalidObject)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author')
    })
})

describe('saveQuestionAnswer', () => {
    it('will return true if resoved', async() => {
        const validObject = {authedUser:'tylermcginnis', qid:'8xf0y6ziyjabvozdd253nd', answer:'optionOne'}

        const result = await _saveQuestionAnswer(validObject)
        expect(result).toEqual(true)
    })
    
    it('will throw an error if rejected', async() => {
        const invalidObject = {qid:'h4d', answer:'option'}

        await expect(_saveQuestionAnswer(invalidObject)).rejects.toEqual('Please provide authedUser, qid, and answer')
    })
})