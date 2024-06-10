import { Component } from "react";
import { withRouter } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { FaRegBell } from "react-icons/fa6";
import indianflag from '../../indianflag.jpeg';

class ProjectMenuNavBar extends Component{

    render(){
        const{projectName,optionName} = this.props
        return(
            <nav className="navBar">
                        <div className="path">
                            <GoHome className="homeIcon" />/<p className="pathTitle">{projectName}</p>/<p className="pathDestination">{optionName}</p>
                        </div>
                        <div className="settingsAndLang">
                            <select className="lan">
                                <option>EN</option>
                                <option>TE</option>
                                <option>HI</option>
                            </select>
                            <img className="flag" src={indianflag} alt='flag' />
                            <FaRegBell className="bellIcon" />
                        </div>
                    </nav>
        )
    }
}

export default withRouter(ProjectMenuNavBar)