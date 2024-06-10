import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaCirclePlus, FaTrash } from 'react-icons/fa6';
import HomeNav from '../HomeNav';
import './index.css';

class Projects extends Component {
    state = { projectList: [] };

    componentDidMount() {
        const projectList = localStorage.getItem('projectList');
        if (projectList) {
            this.setState({ projectList: JSON.parse(projectList) });
        } else {
            this.setState({ projectList: [] });
        }
    }

    onCreateProject = () => {
        const { history } = this.props;
        history.replace('/');
    };

    onDeleteProject = (projectId, event) => {
        event.stopPropagation(); // Prevent event propagation to the link
        const { projectList } = this.state;
        const updatedProjectList = projectList.filter((project) => project.id !== projectId);
        localStorage.setItem('projectList', JSON.stringify(updatedProjectList));
        this.setState({ projectList: updatedProjectList });
    };

    render() {
        const { projectList } = this.state;
        return (
            <div className="projectsBgContainer">
                <HomeNav />
                <div className="projectHeadingCard">
                    <h1 className="projectHeading">Projects</h1>
                    <button onClick={this.onCreateProject} className="createProjectBtn" type="button">
                        <FaCirclePlus className="plusLogo" />
                        Create New Project
                    </button>
                </div>
                <ul className="projectListContainer">
                    {projectList.length > 0 ? (
                        projectList.map((each) => (
                            <li className="projectListItem" key={each.id}>
                                <Link className="linkStyle" to={`projectDetails/${each.id}`} >
                                    <div className="logoLetter">
                                        <h1>{each.projectName[0]}</h1>
                                    </div>
                                    <div className="listItemDetails">
                                        <div className='projectNameCard'>
                                            <h2 className="projectName">{each.projectName}</h2>
                                        </div>
                                        <p>{each.taskList.length} episodes</p>
                                        <p>Created on: {each.Date}</p>
                                    </div>
                                </Link>
                                <FaTrash className="deleteIcon" onClick={(event) => this.onDeleteProject(each.id, event)} />
                            </li>
                        ))
                    ) : (
                        <div className="emptyProjectsCard">
                            <h1>No Projects to Show.</h1>
                        </div>
                    )}
                </ul>
            </div>
        );
    }
}

export default Projects;
