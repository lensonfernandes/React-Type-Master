import React from 'react'

import AccountIcon from './AccountIcon'

const Header = () => {
  return (
    <div className="header">
        <div className="logo">
            Type Master
        </div>
        <div className="icons">
            {/* account icon  */}
            <AccountIcon />
        </div>
    </div>
  )
}

export default Header