export const Login = () => {
    return(
        <div>
            <h2 className="title" >LogIn</h2>
            <form className="authform">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"    
                    id="name"
                    name="name"
                    placeholder="Your full name"       
                />
                <label htmlFor="password">Password:</label><br />
                <input
                    type="text"    
                    id="password"
                    name="password"
                    placeholder="**********"                 
                /> 
            <input className="btn" type="submit" value="LogIn" />
            </form>
        </div>
    )
}