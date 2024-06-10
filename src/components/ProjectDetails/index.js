import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import ProjectMenuNavBar from '../ProjectMenuNavBar';
import './index.css';
import UploadBtnPopup from "../UploadBtnPopup";
import { AiOutlineYoutube } from "react-icons/ai";
import { TbBrandSpotify } from "react-icons/tb";
import { ImRss2 } from "react-icons/im";
import cloud_upload from '../../cloud_upload.png';
import ProjectDetailsNavBar from '../ProjectsDetailsNavBar';

const uploadBtns = [
    {
        name: 'Youtube Video',
        path: <AiOutlineYoutube className="youtubeIcon" />
    },
    {
        name: 'Spotify Podcast',
        path: <TbBrandSpotify className="spotifyIcon" />
    },
    {
        name: 'RSS Feed',
        path: <ImRss2 className="rssIcon" />
    }
];

class ProjectDetails extends Component {
    state = { projectItem: {}, taskList: [], popupOpen: false, popupContent: {} };

    componentDidMount() {
        const { match } = this.props;
        const { params } = match;
        const { id } = params;
        const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
        const filterlist = projectList.filter(each => each.id === id);
        if (filterlist.length > 0) {
            this.setState({ projectItem: filterlist[0], taskList: filterlist[0].taskList || [] });
        }
    }

    onClickPopup = (each) => {
        this.setState({ popupOpen: true, popupContent: each });
    }

    onClosePopup = () => {
        this.setState({ popupOpen: false, popupContent: {}});
    }

    getTaskDetails = (task) => {
        const { projectItem, taskList } = this.state;
        const taskIndex = taskList.findIndex(each => each.taskId === task.taskId);
        let updatedTaskList;

        if (taskIndex !== -1) {
            updatedTaskList = taskList.map(each => each.taskId === task.taskId ? task : each);
        } else {
            updatedTaskList = [...taskList, task];
        }

        const updatedProjectItem = { ...projectItem, taskList: updatedTaskList };
        const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
        const updatedProjectList = projectList.map(project =>
            project.id === projectItem.id ? updatedProjectItem : project
        );

        localStorage.setItem('projectList', JSON.stringify(updatedProjectList));

        this.setState({ taskList: updatedTaskList, popupOpen: false, popupContent: {}});
    }


    onEditTask = (task) => {
        const { history, match } = this.props;
        const { params } = match;
        const { id } = params;

        const currentDate = new Date();
        const formatDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

        const taskObj = {
            taskName: task.taskName,
            taskDescription: task.taskDescription,
            Date: formatDate,
            status: task.status,
            taskId: task.taskId
        };

        this.getTaskDetails(taskObj);

        history.push({
            pathname: `/projectDetails/${id}/transcript`,
            state: { taskId: task.taskId, taskDescription: task.taskDescription }
        });
    }

    onDeleteTask = (taskId) => {
        const { projectItem, taskList } = this.state;
        const updatedTaskList = taskList.filter(task => task.taskId !== taskId);
        const updatedProjectItem = { ...projectItem, taskList: updatedTaskList };
        const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
        const updatedProjectList = projectList.map(project =>
            project.id === projectItem.id ? updatedProjectItem : project
        );

        localStorage.setItem('projectList', JSON.stringify(updatedProjectList));

        this.setState({ taskList: updatedTaskList });
    }

    render() {
        const { projectItem, taskList, popupOpen, popupContent } = this.state;
        const { projectName } = projectItem;
        return (
            <div className={`projectDetailsCard ${popupOpen && 'opacityValue'}`}>
                <ProjectMenuNavBar />
                <div>
                    <ProjectDetailsNavBar projectName={projectName} optionName={'Upload'}/>
                    <h1 className="uploadHeading">Upload</h1>
                    <ul className="btnCard">
                        {uploadBtns.map(each =>
                            <button onClick={() => this.onClickPopup(each)} className="uploadBtn" type='button' key={uuidv4()}>
                                {each.path}
                                <div>
                                    <p>Upload</p>
                                    <p>{each.name}</p>
                                </div>
                            </button>
                        )}
                    </ul>
                    {taskList.length === 0 ? (
                        <>
                            <ul className="btnCard">
                                {uploadBtns.map(each =>
                                    <button onClick={() => this.onClickPopup(each)} className="uploadBtn" type='button' key={uuidv4()}>
                                        {each.path}
                                        <div>
                                            <p>Upload</p>
                                            <p>{each.name}</p>
                                        </div>
                                    </button>
                                )}
                            </ul>
                            <div className="orCard">
                                <p>or</p>
                            </div>
                            <div className="uploadCard">
                                <img className="uploadImg" src={cloud_upload} alt='upload img' />
                                <h3>Select a file or drag and drop here (Podcast Media or Transcription Text)</h3>
                                <p>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
                                <button className="selectfileBtn" type='button'>select file</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="TryitCard">
                                <p className="tryText">All Files are Processed! Your Widget is Ready to go!</p>
                                <button type="button" id="tryBtn">Try it out!</button>
                            </div>
                            <div className="tabelCard">
                                <table className="taskTable">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taskList.map(task => (
                                            <tr key={task.taskId}>
                                                <td>{task.taskName}</td>
                                                <td>{task.Date}</td>
                                                <td>{task.status || 'Pending'}</td>
                                                <td>
                                                    <button onClick={() => this.onEditTask(task)}>Edit</button>
                                                    <button className="taskDeleteBtn" onClick={() => this.onDeleteTask(task.taskId)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
                {popupOpen && (
                    <UploadBtnPopup
                        getTaskDetails={this.getTaskDetails}
                        each={popupContent}
                        isOpen={popupOpen}
                        onClosePopup={this.onClosePopup}
                    />
                )}
            </div>
        );
    }
}

export default withRouter(ProjectDetails);
