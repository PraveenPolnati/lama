import { Component } from "react";
import './index.css'
import ProjectMenuNavBar from '../ProjectMenuNavBar'
import ProjectDetailsNavBar from '../ProjectsDetailsNavBar'
import './index.css'

class WedgetConfiguration extends Component{
    state = {projectName:'',activeBtn:'Display',primaryColor:'#000000',fontColor:'#ffffff'}

    componentDidMount(){
        const {id} = this.props.match.params
        const projectList = JSON.parse(localStorage.getItem('projectList'))
        const project = projectList.filter(each=>each.id===id)
        this.setState({projectName:project[0].projectName})
    }

    onClickWedgetBtn = (event)=>{
        this.setState({activeBtn:event})
    }

    onChangePrimaryColor = (event)=>{
        this.setState({primaryColor:event.target.value})
    }

    onChangeFontColor = (event)=>{
        this.setState({fontColor:event.target.value})
    }

    render(){
        const{projectName,activeBtn,primaryColor,fontColor} = this.state
        return(
            <div className="wedgetCard">
                <ProjectMenuNavBar/>
                <div>
                    <ProjectDetailsNavBar projectName={projectName} optionName={'Widget Configuration'}/>
                    <div className="wedgetContainer">
                        <h1 className="ConfigHeading">Configuration</h1>
                        <div className="wedgetBtnCard">
                            <button onClick={()=>this.onClickWedgetBtn('General')} className={`btnWedget ${activeBtn === 'General' && 'activeBtn'}`} type="button">General</button>
                            <button onClick={()=>this.onClickWedgetBtn('Display')} className={`btnWedget ${activeBtn === 'Display' && 'activeBtn'}`} type="button">Display</button>
                            <button className="btnWedget" type="button">Advance</button>
                        </div>
                        <hr className="WedgetLine"/>
                        <div className={`${activeBtn === 'Display' ? 'displayController':'generalCard'}`}>
                            <label className="generalLabeltext" htmlFor="chatbotName">Chatbot Name</label>
                            <input placeholder="Enter text here" id='chatbotName' className="generalInputEle" type='text'/>
                            <br/>
                            <label className="generalLabeltext">Welcome Message</label>
                            <input placeholder="Enter text here" className="generalInputEle" type="text"/>
                            <br/>
                            <label className="generalLabeltext">Input Placeholder</label>
                            <input placeholder="Enter text here" className="generalInputEle" type='text'/>
                        </div>
                        <div className={`${activeBtn === 'General' ? 'displayController':'displayCard'}`}>
                            <div className="displayCard1">
                                <div>
                                    <label>Primary Color</label>
                                    <br/>
                                    <div className="inputAndDisplayCard">
                                        <input className="primaryColorInput" onChange={this.onChangePrimaryColor} value={primaryColor} type="text"/>
                                        <input className="displayPrimaryColor" type="color" onChange={this.onChangePrimaryColor} value={primaryColor}/>
                                    </div>
                                </div>
                                <div>
                                    <label>Font Color</label>
                                    <br/>
                                    <div className="inputAndDisplayCard">
                                        <input className="primaryColorInput" onChange={this.onChangeFontColor} value={fontColor} type="text"/>
                                        <input type="color" className="displayPrimaryColor" onChange={this.onChangeFontColor} value={fontColor}/>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="displayCard1">
                                <div>
                                <br/>
                                    <label>Font Size (in px)</label>
                                    <br/>
                                    <input  className="fontSizeInput primaryColorInput" type="text"/>
                                </div>
                                <div>
                                    <label>Chat Height <br/> (in % of total screen)</label>
                                    <br/>
                                    <input className="fontSizeInput primaryColorInput" type="text"/>
                                </div>
                            </div>
                            <hr className="WedgetLine"/>
                            <div >
                                <h2 className="ConfigHeading">
                                    Chat Icon
                                </h2>
                                <div className="displayCard1">
                                    <div>
                                        <label>Chat Icon Size</label>
                                        <br/>
                                        <input className="chatIconSizeInput" type="text"/>
                                    </div>
                                    <div>
                                        <label>Position on Screen</label>
                                        <br/>
                                        <select className="positionInput" type="text">
                                            <option>Bottom Right</option>
                                            <option>Bottom Left</option>
                                            <option>Top Right</option>
                                            <option>Top Left</option>
                                        </select>
                                    </div>
                                </div>
                                <br/>
                                <div className="displayCard1">
                                    <div>
                                        <label>Distance from Bottom <br/> (in px)</label>
                                        <br/>
                                        <input className="chatIconSizeInput" type="text"/>
                                    </div>
                                    <div>
                                        <label>Horizontal Distance <br/>(in px)</label>
                                        <br/>
                                        <input className="chatIconSizeInput" type="text"/>
                                    </div> 
                                </div>
                            </div>
                            
                            <div className="dummyIconCard">
                                <h2>Bot Icon</h2>
                                <h1 className="dummyIcon">.</h1>
                                <button className="uploadIconBtn" type="button">Upload Image</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WedgetConfiguration