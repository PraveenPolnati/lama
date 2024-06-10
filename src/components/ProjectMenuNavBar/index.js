import { Component } from "react";
import { withRouter } from "react-router-dom";
import { ImBasecamp } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import './index.css';

const menuList = [
    { id: '1', name: 'ProjectDetails', path: '/projectDetails' },
    { id: '2', name: 'Webget Configuration', path: '/projectDetails/wedgetconfiguration' },
    { id: '3', name: 'Deployment', path: '/none' },
    { id: '4', name: 'Pricing', path: '/none' }
];

class ProjectMenuNavBar extends Component {
    state = { isActiveBtn: '1', id: '' };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({ id });

        const activeBtn = localStorage.getItem('activeBtn') || '1';
        this.setState({ isActiveBtn: activeBtn });
    }

    onSelect = (id, path) => {
        this.setState({ isActiveBtn: id });
        localStorage.setItem('activeBtn', id);
        if (path !== '/none') {
            this.props.history.push(`${path}/${this.state.id}`);
        }
    }

    onClickSettings = () => {
        const{id} = this.state
        this.setState({ isActiveBtn: 'settings' });
        localStorage.setItem('activeBtn', 'settings');
        this.props.history.replace(`/accountSettings/${id}`);
    }

    render() {
        const {isActiveBtn } = this.state;
        return (
            <div className="MenuNavbar">
                <div className="card1">
                    <button type="button" className="logoCard">
                        <ImBasecamp className='logo' />
                        <h1>LAMA.</h1>
                    </button>
                    <p className="podcastMenuHeading">Podcast Upload Flow</p>
                    <ul className="menulist">
                        {
                            menuList.map(each => (
                                <li className="menuListCard" key={each.id}>
                                    <button
                                        disabled={each.id === '3' || each.id === '4'}
                                        className={`menuItem ${isActiveBtn === each.id ? 'MenuactiveBtn' : ''}`}
                                        onClick={() => this.onSelect(each.id, each.path)}
                                        type="button"
                                        value={each.id}
                                    >
                                        <p className="listNum">{each.id}</p>{each.name}
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                    <hr className="line" />
                </div>
                <div>
                    <hr className="line" />
                    <button onClick={this.onClickSettings} className={`settingsCard ${isActiveBtn === 'settings' ? 'MenuactiveBtn' : ''}`}>
                        <IoSettingsOutline className="settingsIcon" />
                        <p className="settingsText">Settings</p>
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(ProjectMenuNavBar);
