

export const PollCard = () => {
    return(
        <div className="cardbox">
            <div className="cardinfo">
                <div className="cardname">name</div>
                <div className="carddate">date</div>
            </div>
            <div className="card-quest">
                <div className="quest">Would you rather...  </div>
                <div className="Q checkA">✓ </div>                
                <div className="Q optA">Option  asdf awef awef awef awef awef awef awef  </div>
                <div className="Q checkB">✗ </div>
                <div className="Q optB">Option B </div>
            </div>
            <button className="btn-card">Vote Now</button>
        </div>
    )
}