import React from "react"
import { Helmet } from "react-helmet"

const ContainerPage = (props) =>{
    return(
        <div className="w-100">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
            </Helmet>
            <div className="container">
                <props.viewPage {...props} />
            </div>
        </div>
    )
}

export default ContainerPage