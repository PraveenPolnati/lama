import React, { Component } from "react";
import ProjectMenuNavBar from '../ProjectMenuNavBar';
import ProjectsDetailsNavBar from "../ProjectsDetailsNavBar";
import './index.css';
import { HiOutlinePencil } from "react-icons/hi";
import { IoSearchCircleOutline } from "react-icons/io5";

class Transcript extends Component {
    state = { 
        taskDescription: '', 
        originalDescription: '', 
        editable: false, 
        taskStatus: '',
        projectName: '' 
    };

    componentDidMount() {
        const { taskId } = this.props.location.state;
        const { id } = this.props.match.params;
        const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
        const project = projectList.find(project => project.id === id);
        
        if (project) {
            const task = project.taskList.find(task => task.taskId === taskId);
            if (task) {
                const { taskDescription, status } = task;
                this.setState({ 
                    taskDescription, 
                    originalDescription: taskDescription, 
                    taskStatus: status, 
                    projectName: project.projectName
                });
            }
        }
    }

    toggleEdit = () => {
        this.setState(prevState => ({ editable: !prevState.editable }));
    }

    onChangeDescription = (event) => {
        this.setState({ taskDescription: event.target.value });
    }

    onChangeStatus = (event) => {
        this.setState({ taskStatus: event.target.value });
    }

    onSaveChanges = () => {
        const { taskDescription, taskStatus, projectName } = this.state;
        const { taskId } = this.props.location.state;
        const { id } = this.props.match.params;
        const projectList = JSON.parse(localStorage.getItem('projectList')) || [];

        const currentDate = new Date();
        const formatDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

        const updatedProjectList = projectList.map(project => {
            if (project.id === id) {
                const updatedTaskList = project.taskList.map(task => {
                    if (task.taskId === taskId) {
                        return { ...task, taskDescription, status: taskStatus, Date: formatDate };
                    }
                    return task;
                });
                return { ...project, taskList: updatedTaskList };
            }
            return project;
        });

        localStorage.setItem('projectList', JSON.stringify(updatedProjectList));

        this.props.history.push(`/projectDetails/${id}`, { projectName });
    }

    onDiscardChanges = () => {
        const { id } = this.props.match.params;
        this.props.history.push(`/projectDetails/${id}`);
    }

    render() {
        const { taskDescription, editable, taskStatus, projectName } = this.state;
        return (
            <div className="transcriptBgContainer">
                <ProjectMenuNavBar/>
                <div>
                    <ProjectsDetailsNavBar projectName={projectName} optionName={'Transcript'}/>
                    {editable ? (
                        <>
                            <div className="headingCard">
                                <h1 className="editHeading">Edit Task Description</h1>
                                <div className="buttonsContainer">
                                        <button onClick={this.onDiscardChanges} className="discardButton">Discard</button>
                                        <button onClick={this.onSaveChanges} className="saveButton">Save & Exit</button>
                                </div>
                            </div>
                            <div className="transcriptContainer">
                                <textarea
                                    value={taskDescription}
                                    onChange={this.onChangeDescription}
                                    className="textArea"
                                />
                                <div>
                                    <label>Status: </label>
                                    <select className="statusMenu" value={taskStatus} onChange={this.onChangeStatus}>
                                        <option value="Not Started">Not Started</option>
                                        <option value="On Going">On Going</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                                <br/>
                                <div>
                                    <label>Project Name: </label>
                                    <input type="text" value={projectName} disabled />
                                </div>
                                
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="TaskDesHeading">Task Description</h1>
                            <div className="transcriptContainer">
                                <div className="editBtnCard">
                                    <button className="editBtn" onClick={this.toggleEdit}> <HiOutlinePencil className="pencilIcon"/> Edit Mode</button>
                                    <IoSearchCircleOutline className="searchIcon"/>
                                </div>
                                <div className="textArea">{taskDescription}</div>
                                <div>Project Name: {projectName}</div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default Transcript;
