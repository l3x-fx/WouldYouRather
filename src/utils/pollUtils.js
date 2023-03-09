export const getAnsweredPollsByUserID = (polls, userID) => { 
    return Object.values(polls)
        .filter(poll =>  poll.optionOne.votes.includes(userID) || poll.optionTwo.votes.includes(userID) )   
        .sort((x,y) => y.timestamp - x.timestamp)
}

export const getOpenPollsByUserID = (polls, userID) => {
    return Object.values(polls)
        .filter(poll => !getAnsweredPollsByUserID(polls, userID).includes(poll))
        .sort((x,y) => y.timestamp - x.timestamp)
}

export const getAnswerCountByUserID = (polls, userID) => getAnsweredPollsByUserID(polls, userID).length

export const getQuestionCountByUserID =(polls, userID) => Object.values(polls).filter(poll => poll.author === userID).length
