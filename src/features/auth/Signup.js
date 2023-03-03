export const Signup = () => {
    return(
        <div>
            <h2 className="title" >SignUp</h2>
            <form className="authform">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"    
                    id="name"
                    name="name"
                    placeholder="Your full name"       
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="text"    
                    id="password"
                    name="password"
                    placeholder="**********"                 
                />
                 <label htmlFor="password-repeat">Repeat Password:</label>
                <input
                    type="text"    
                    id="password-repeat"
                    name="password-repeat"
                    placeholder="**********"                 
                />
            <input className="btn" type="submit" value="SignUp" />
            </form>
        </div>        
    )
}