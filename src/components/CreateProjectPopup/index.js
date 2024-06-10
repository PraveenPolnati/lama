import { Component } from "react";
import Popup from "reactjs-popup";
import './index.css'

class CreateProjectPopup extends Component{

    state={isOpen:true,projectName:''}

    onCancel = ()=>{
        this.setState({isOpen:false})
        const {onCloseCreateProjectPopup} = this.props
        onCloseCreateProjectPopup()
    }

    onEnterProjectName = (event)=>{
        this.setState({projectName:event.target.value})
    }

    onClickCreate = ()=>{
        const{projectName} = this.state
        const{getProjectList} = this.props
        getProjectList(projectName)
    }

    render(){
        const{isOpen,projectName} = this.state
        return(
            <Popup
                open={isOpen}
                modal
                closeOnDocumentClick={false}
                closeOnEscape={false}
            >
                {
                    close=>(
                        <div className="createProjectPopupCard">
                            <h2>Create a New Project</h2>
                            <label htmlFor="projectTitle">Enter Project Name:</label>
                            <br/>
                            <input value={projectName} onChange={this.onEnterProjectName} className="projectTitle" id='projectTitle' placeholder="Type here" type='text'/>
                            {projectName.length===0 && <p className="emptyTitleWarning">Project Name Can't be Empty</p>}
                            <div className="createProjectBtnCard">
                                <button className="cancelBtn" onClick={this.onCancel} type='button'>Cancel</button>
                                <button onClick={this.onClickCreate} className="CreateBtn" type='button'>Create</button>
                            </div>
                        </div>
                    )
                }

            </Popup>
        )
    }
}

export default CreateProjectPopup