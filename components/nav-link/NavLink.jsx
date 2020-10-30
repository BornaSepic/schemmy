import {withRouter} from 'next/router'
import Link from 'next/link'
import React from 'react'

const NavLink = ({router, children, ...props}) => {
    const activeLinkClassName = "active-link";

    let className = children.props.className || null;
    if (router.pathname === props.href) {
        className = `${className !== null ? className : ''} ${activeLinkClassName}`.trim()
    }

    return <Link {...props}>{React.cloneElement(children, {className})}</Link>
};

export default withRouter(NavLink);