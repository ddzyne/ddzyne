import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { DEFAULT_PAGE } from '../reducers/pages'
import { motion, AnimatePresence } from 'framer-motion'

const MenuContainer = ({menu, page, currentPage}) => {
    const pageTitle = page.cmb2.titel_metabox.titel_project === '' ? String.fromCharCode(160) : page.cmb2.titel_metabox.titel_project
    return (
        <div className="wrapper menu">
            <AnimatePresence>
                {currentPage !== '' &&
                    <motion.div 
                        positionTransition
                        className="item"
                        id="logo-header"
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}>
                        <Link to="/" rel="home">Ddzyne</Link>
                        <AnimatePresence exitBeforeEnter>
                            <motion.h1
                                positionTransition
                                key={currentPage}
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -100, opacity: 0 }} >
                                {pageTitle}
                            </motion.h1>
                        </AnimatePresence>
                    </motion.div>
                }
            </AnimatePresence>
            <motion.nav className="item" positionTransition>
                {menu.map( 
                    (item, i) => <Link key={i} to={`/${item.attr_title}`} className={item.attr_title === currentPage ? 'active' : undefined}>{item.title}</Link> 
                )}
            </motion.nav>
        </div>
    )
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