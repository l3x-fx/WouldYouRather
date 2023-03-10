import { 
    getAnsweredPollsByUserID, 
    getAnswerCountByUserID, 
    getQuestionCountByUserID, 
    getOpenPollsByUserID
 } from "./pollUtils"

const initialPolls = {
    "1": {
      id: '1',
      author: 'janedoe',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['janedoe'],
      },
      optionTwo: {
        votes: [],

      }
    },
    "2": {
      id: '2',
      author: 'yamadataro',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
      },
      optionTwo: {
        votes: ['yamadataro', 'janedoe'],
      }
    },
    "3": {
      id: '3',
      author: 'janedoe',
      timestamp: 1488579767190,
      optionOne: {
        votes: [],
      },
      optionTwo: {
        votes: ['janedoe'],
      }
    },
    "4": {
      id: '4',
      author: 'yamadataro',
      timestamp: 1482579767190,
      optionOne: {
        votes: [],
      },
      optionTwo: {
        votes: ['yamadataro'],
      }
    }
  }

describe('getAnsweredPollsByUserID', () => {
    it('will return array of polls an user has answered', () => {
        expect(getAnsweredPollsByUserID(initialPolls, 'janedoe')).toHaveLength(3)
        expect(getAnsweredPollsByUserID(initialPolls, 'yamadataro')).toHaveLength(2) 
    })
})

describe('getOpenPollsByUserID', () => {
    it('will return array of polls an user has not yet answered', () => {
      expect(getOpenPollsByUserID(initialPolls, 'janedoe')).toHaveLength(1)
      expect(getOpenPollsByUserID(initialPolls, 'yamadataro')).toHaveLength(2) 
    })
})

describe('getAnswerCountByUserID', () => {
    it('will return the number of polls an user answered', () => {
        const result = getAnswerCountByUserID(initialPolls, 'yamadataro')
        expect(result).toEqual(2)       
    })
})

describe ('getQuestionCountByUserID', () => {
    it ('will return the number of polls an user created', ()=> {
        const result = getQuestionCountByUserID(initialPolls, 'janedoe')
        expect(result).toEqual(2) 
    })
})
