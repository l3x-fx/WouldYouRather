import dummy from '../../icons/ava-dummy.png';

export const Leaderboard = () => {
    return(
        <div>
            <h2 className="title">Leaderboard</h2>

            <div className="leaderbaord">
                <div></div>
                <div className="username LBtitle">Name</div>
                <div className="LBtitle">Answered</div>
                <div className="LBtitle">Created</div>

                <div className="ava"><img src={dummy} alt='avatar dummy'/></div>
                <div className="username">Name</div>
                <div>5</div>
                <div>6</div>

                <div className="ava"><img src={dummy} alt='avatar dummy'/></div>
                <div className="username">Name</div>
                <div>4</div>
                <div>5</div>

                <div className="ava"><img src={dummy} alt='avatar dummy'/></div>
                <div className="username">Name</div>
                <div>4</div>
                <div>4</div>

                <div className="ava"><img src={dummy} alt='avatar dummy'/></div>
                <div className="username">Name</div>
                <div>2</div>
                <div>3</div>
            </div>
        </div>
    )
}