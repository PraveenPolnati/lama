import { Component } from "react";
import ProjectMenuNavBar from "../ProjectMenuNavBar";
import ProjectsDetailsNavBar from "../ProjectsDetailsNavBar";
import { CgProfile } from "react-icons/cg";
import './index.css'

class AccountSettings extends Component{

    state={email:'no mail'}

    componentDidMount(){
        const email = JSON.parse(localStorage.getItem('userMailId'))
        this.setState({email})
    }

    render(){
        const{email} = this.state
        return(
            <div className="settingsContainer">
                <ProjectMenuNavBar/>
                <div>
                    <ProjectsDetailsNavBar optionName={'Account Settings'}/>
                    <div className="accountSettingsCard">
                        <h1 className="settingsHeading">Account Settings</h1>
                        <div className="profileDetailsCard">
                            <CgProfile className="profileLogo"/>
                            <div>
                                <label htmlFor="User Name">User Name</label>
                                <br/>
                                <input className="settingsInput" type='text' id='User Name'/>
                            </div>
                            <div>
                                <label htmlFor="Email">Email</label>
                                <br/>
                                <input disabled  className="settingsInput" value={email} type="text" id='Email'/>
                            </div>
                        </div>
                        <h1 className="settingsHeading">Subscriptions</h1>
                        <div className="subscriptonCard">
                            <h2 className="subHead">You are currently on the Ques AI Basic Plan!</h2>
                            <button className="upgradeBtn" type="button">Upgrade</button>
                        </div>
                        <button type="button" className="sunCancelBtn">Cancel Subscription</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountSettings