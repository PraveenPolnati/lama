import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import Popup from "reactjs-popup";
import './index.css';

class UploadBtnPopup extends Component {
    state = { isOpen: false, name: '', icon: '', taskName: '', taskDes: '', status: 'Not Started' };

    componentDidMount() {
        const { isOpen, each } = this.props;
        if (!isOpen) {
            this.setState({ isOpen});
        } else {
            this.setState({ isOpen, name: each.name, icon: each.path });
        }
    }

    onEnterName = (event) => {
        this.setState({ taskName: event.target.value });
    }

    onEnterDescription = (event) => {
        this.setState({ taskDes: event.target.value });
    }

    onChangeStatus = (event) => {
        this.setState({ status: event.target.value });
    }

    onSaveTask = () => {
        const { getTaskDetails } = this.props;
        const { taskName, taskDes, status } = this.state;
        const currentDate = new Date();
        const formatDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
        const taskObj = {
            taskName,
            taskDescription: taskDes,
            Date: formatDate,
            status,
            taskId: uuidv4()
        };
        getTaskDetails(taskObj);
    }

    render() {
        const { isOpen, name, icon, taskName, taskDes, status } = this.state;
        const { onClosePopup } = this.props;
        return (
            <Popup
                open={isOpen}
                closeOnEscape={false}
                closeOnDocumentClick={false}
                modal
                onClose={onClosePopup}
            >
                <div className="UploadPopupContainer">
                    <div className="popupNav">
                        <div className="popupHeader">
                            {icon}
                            <h2>Upload from {name}</h2>
                        </div>
                        <div className="popupFooter">
                            <button className="closeBtn" onClick={onClosePopup}>&times;</button>
                        </div>
                    </div>
                    <div className="taskInputEleCard">
                        <label className="labelEle" htmlFor="name">Name</label>
                        <input onChange={this.onEnterName} value={taskName} className="nameInput" type="text" id="name" />
                        <label className="labelEle" htmlFor="description">Description</label>
                        <input onChange={this.onEnterDescription} value={taskDes} className="nameInput" type="text" id="description" />
                        <label className="labelEle" htmlFor="status">Status</label>
                        <select className='taskStatus' onChange={this.onChangeStatus} value={status} id="status">
                            <option value="Not Started">Not Started</option>
                            <option value="On Going">On Going</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <button onClick={this.onSaveTask} className="saveDetailsBtn" type="button">Save</button>
                </div>
            </Popup>
        );
    }
}

export default UploadBtnPopup;
