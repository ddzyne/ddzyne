import React from 'react'
import {Helmet} from "react-helmet"

const Title = (props) => 
    <Helmet>
        <title>{props.title} - Ddzyne - Bespoke webdevelopment & design</title>
        <meta name="description" content={props.meta.replace(/(<([^>]+)>)|\n/ig, "").replace(/&#(\d{0,4});/g, (fullStr, str) => String.fromCharCode(str) )} />
    </Helmet>

export default Title