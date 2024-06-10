import {withRouter} from 'react-router-dom';
import './index.css'
import { ImBasecamp } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa6";



const HomeNav = (props)=> {
    const onClickLogo = () => {
        const {history} = props
        history.replace('/')
    }
    return (
    <div className='HomeNavCard'>
        <button onClick={onClickLogo} className='logoCard'>
            <ImBasecamp className='logo'/>
            <h1 className='lamaHeading'>
                LAMA.
            </h1>
        </button>
        <div className='bellAndSettingsCard'>
            <IoSettingsOutline className='settingsLogo'/>
            <FaRegBell className='bellLogo'/>
        </div>
    </div>
)}

export default withRouter(HomeNav)