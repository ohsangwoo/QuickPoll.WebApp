import PropTypes from 'prop-types'
import Button from './Button'
import { FaPollH } from 'react-icons/fa'

export const Header = ({title}) => {
    return (
        <header className='header'>
            <h1><FaPollH /> {title}</h1>
        </header>
    )
}


Header.defaultProps = {
    title: 'Quick Poll',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}


// const headingStyle = {
//     color: 'red', backgroundColor: 'black',
// }

export default Header
