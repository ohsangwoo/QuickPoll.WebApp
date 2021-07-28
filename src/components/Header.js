import PropTypes from 'prop-types'
import { FaPollH } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Header = ({title}) => {
    return (
        <header className='header'>
            <Link className='linkTo' to="/"><h1><FaPollH /> {title}</h1></Link>
        </header>
    )
}


Header.defaultProps = {
    title: 'Quick Poll',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
