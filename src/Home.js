import React, {useContext} from 'react';
import UserContext from "./userContext";


function Home() {
    const { curUser } = useContext(UserContext)

    return (
        <>
            <h1>Developer Carbon Emission Evaluation App</h1>
            <h4>Enter application parameters - get out actions to reduce CO2 impact.</h4>
            <h3>{curUser ? `Welcome back ${curUser.firstName}`: null}</h3>
        </>
    )
}

export default Home;