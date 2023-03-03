import dummy from '../../icons/ava-dummy.png';
import './polldetails.css'

export const PollDetails = () => {
    return(
        <div className="blah">
        <div className="quest-detail">
            <div className="quest-title">
                <div className="ava qava"><img src={dummy} alt='avatar dummy' /></div>
                <div className="quest-name">John Doe asks:</div>
                <h2 className="quest-detail-title">Would you rather ... </h2>
            </div>

            <div className="check DcheckA">✓</div> 
            <div className="det DoptA">Option A </div> 
            <div className="det DoptB">Option B</div> 
            <div className="check DcheckB">✗</div> <br />
         
            <div className="statsA">
                <div className="resultbarA">
                    <div className="resultA">ssss</div>
                </div>
                <div className="votesA">x votes</div> 
            </div>
           <div className="statsB">
                <div className="resultbarB">
                    <div className="resultB">ssss</div>
                </div>
                <div className="votesB">x votes</div> 
            </div>
            

            <button className="btn btnoptA">Option A</button>
            <button className="btn btnoptB">Option B</button>
            <button className="btn btnback">Back</button>
        </div>
        </div>
    )
}