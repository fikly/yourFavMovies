import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router"
import './Pagination.scss'

const Pagination = (props) => {
    const [disableNext, setNext] = useState(true)
    const [disablePrev, setPrev] = useState(true)
    const { totalPage, currentPage } = props

    useEffect(() => {
        const { totalPage } = props
        let paramsPage = new URLSearchParams(props.location.search).get('page')
        if (totalPage) {
            if (paramsPage) {
                const intParamsPage = parseInt(paramsPage)
                if (intParamsPage <= 1) {
                    setPrev(true)
                } else {
                    setPrev(false)
                }
                if (totalPage === intParamsPage) {
                    setNext(true)
                } else {
                    setNext(false)
                }
            } else {
                if (totalPage > 1) {
                    setNext(false)
                }
                setPrev(true)
            }
        }
    }, [props])

    const handleClickPage = (page) => {
        const { params, locationName } = props

        let queryString = ""
        if (params.toString() === "") {
            queryString = "?page=" + page
        } else {
        if (params.get('page')) {
            params.set('page', page)
        } else {
            params.append('page', page)
        }
            queryString = "?" + params.toString()
        }

        props.history.push(locationName + queryString)
    }

    const nextPage = () => {
        const { params, locationName, totalPage } = props
        let paramsPage = new URLSearchParams(props.location.search).get('page')
        let queryString = ""
        if (paramsPage) {
            const intparamsPage = parseInt(paramsPage)
            if (intparamsPage < totalPage) {
                paramsPage = intparamsPage + 1
                params.set('page', paramsPage)
                queryString = "?" + params.toString()
                props.history.push(locationName + queryString)
            } else {
                setNext(true)
            }
        } else {
            if (totalPage > 1) {
                params.append('page', 2)
                queryString = "?" + params.toString()
                props.history.push(locationName + queryString)
            }
        }
    }

    const prevPage = () => {
        const { params, locationName } = props
        let paramsPage = new URLSearchParams(props.location.search).get('page')
        let queryString = ""
        const intparamsPage = parseInt(paramsPage)
        if (paramsPage) {
            paramsPage = intparamsPage - 1
            params.set('page', paramsPage)
            queryString = "?" + params.toString()
            props.history.push(locationName + queryString)
        } else {
            setPrev(true)
        }
    }

    let createPage = [
        { page: 1 },
        { page: 2 },
        { page: 3 },
        { page: 4 },
        { page: 5 }
    ]
    if (totalPage > 5) {
        if (currentPage > 2 && currentPage < totalPage - 1) {
            createPage = [
                { page: currentPage - 2 },
                { page: currentPage - 1 },
                { page: currentPage },
                { page: currentPage + 1 },
                { page: currentPage + 2 }
            ]
        }
        if (currentPage >= totalPage - 1) {
            createPage = [
                { page: totalPage - 4 },
                { page: totalPage - 3 },
                { page: totalPage - 2 },
                { page: totalPage - 1 },
                { page: totalPage }
            ]
        }
    } else {
        createPage = []
        for (let i = 0; i < totalPage; i++) {
            createPage.push({ page: i + 1 })
        }
    }

    let page = []
    if (createPage !== []) {
        for (let i = 0; i < createPage.length; i++) {
            page.push(
                <li onClick={() => handleClickPage(createPage[i].page)} key={createPage[i].page} className={"greyDefault normalFont " + (currentPage === createPage[i].page ? 'active' : '')}><span>{createPage[i].page}</span></li>
            )
        }
    }
    return (
        <div>
        {totalPage > 0 &&
            <div className="custom-pagination">
                <ul className="d-flex m-0 p-0">
                    {disablePrev ?
                        <li className='cursorDefault'><label className='arrow-page-prev cursorDefault' style={{ opacity: '0.3' }}></label></li> :
                        <li onClick={() => prevPage()} className='cursorPointer'><label className='arrow-page-prev cursorPointer'></label></li>
                    }
                    {page}
                    {disableNext ?
                        <li className='cursorDefault'><label className='arrow-page-next cursorDefault' style={{ opacity: '0.3' }}></label></li> :
                        <li onClick={() => nextPage()} className='cursorPointer'><label className='arrow-page-next cursorPointer'></label></li>
                    }
                </ul>
            </div>
        }
        </div>
    )
}

export default withRouter(Pagination)