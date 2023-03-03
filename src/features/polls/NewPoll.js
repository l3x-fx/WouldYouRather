export const NewPoll = () => {
    return(
        <div>
            <h2 className="title">Create a new Poll</h2>
            Would you rather ... 
            <form>
                <textarea
                    className="opt-input"
                    name="optA"
                    cols="30" 
                    rows="5"                  
                    placeholder='Option A'
                />
                <textarea
                    className="opt-input"
                    name="optB"
                    cols="30" 
                    rows="5" 
                    placeholder='Option B'
                /> <br />
                <input className="btn" type="submit" value="Submit New Poll" />
            </form>
        </div>
    )
}