import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { DEFAULT_PAGE } from '../reducers/pages'
import cn from 'classnames'
import ReactCSSTransitionReplace from 'react-css-transition-replace'

class MenuContainer extends Component {
    render() {
        const { menu, page, currentPage } = this.props
        const itemClass = cn('item', {hidden: currentPage === ''})
        const pageTitle = page.cmb2.titel_metabox.titel_project === '' ? String.fromCharCode(160) : page.cmb2.titel_metabox.titel_project
        return (
            <div className="wrapper menu">
                <div className={itemClass} id="logo-header">
                    <Link to="/" rel="home">Ddzyne</Link>
                    <ReactCSSTransitionReplace
                        transitionName="fadeTitle" 
                        transitionEnterTimeout={500} 
                        transitionLeaveTimeout={500}
                        overflowHidden={false}>
                        <h1 id="title" key={currentPage}>{pageTitle}</h1>
                    </ReactCSSTransitionReplace>
                </div>
                <nav className="item">
                    {menu.map( 
                        (item, i) => <NavLink key={i} to={`/${item.attr_title}`}>{item.title}</NavLink> 
                    )}
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const currentPage = state.router.location.pathname.replace(/\//g, "")
    const page = state.pages[currentPage] || state.pages[DEFAULT_PAGE]

    return {
        page: page,
        currentPage: currentPage
    }
}

export default connect(mapStateToProps)(MenuContainer)