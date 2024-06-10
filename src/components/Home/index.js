import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid'
import HomeNav from '../HomeNav';
import Group16Image from '../../Group16.jpg';
import './index.css';
import { FaCirclePlus } from "react-icons/fa6";
import EmailPopup from '../EmailPopup';
import CreateProjectPopup from '../CreateProjectPopup';

class Home extends Component {
    state = {
        isOpen: true,
        createNewProject: false,
        projectList: [],
        isCreated:false
    }

    componentDidMount(){
        const projectList = localStorage.getItem("projectList")
        if(projectList){
            this.setState({projectList:JSON.parse(projectList)})
        }
        const email = localStorage.getItem("userMailId");
        if(email){
            this.setState({isOpen:false})
        }
    }

    componentDidUpdate(prevPops,prevState){
        const{projectList} = this.state
        if(prevState.projectList !== this.state.projectList){
            localStorage.setItem("projectList",JSON.stringify(projectList))
        }
    }


    isPopup = (isOpen) => {
        this.setState({ isOpen: isOpen });
    }

    onCreateNewProject = () => {
        this.setState({ createNewProject: true ,isCreated:false});
    }

    onCloseCreateProjectPopup = () => {
        this.setState({ createNewProject: false });
    }

    getProjectList= (project)=>{
        const currentDate = new Date();
        const formatDate = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`
        const item = {projectName:project,Episodes:0,id:uuidv4(),Date:formatDate,taskList:[]}
        this.setState(prevState=>({projectList:[...prevState.projectList,item],isCreated:true}))
    }

    onClickProjects=()=>{
        this.props.history.replace('/projects')
    }

    render() {
        const { isOpen, createNewProject, isCreated } = this.state;

        if (isCreated) {
            return <Redirect to='/projects' />;
        }

        return (
            <div className='homeBgContainer'>
                <EmailPopup isOpen={isOpen} isPopup={this.isPopup} />
                {createNewProject && <CreateProjectPopup getProjectList={this.getProjectList} onCloseCreateProjectPopup={this.onCloseCreateProjectPopup} />}
                <HomeNav />
                <div className={`homeCard ${isOpen || createNewProject ? 'opacityValue' : ""}`}>
                    <h1 className='mainHeading'>Create a New Project</h1>
                    <img className='groupImage' src={Group16Image} alt='Group 16.jpg' />
                    <div className='descriptionCard'>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        </p>
                    </div>
                    <button onClick={this.onCreateNewProject} type='button' className='createProjectBtn'>
                        <FaCirclePlus className='plusLogo' />
                        Create New Project
                    </button>
                    <button onClick={this.onClickProjects} className='createProjectBtn' type='button'>Projects</button>
                </div>
            </div>
        );
    }
}

export default Home;
