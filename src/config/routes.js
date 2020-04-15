import React from 'react'

const Homepage = React.lazy(() => import('../views/containers/homepage/Page'))

const routes = [
    { path: '/', exact: true, name: 'Homepage', component : Homepage, title : 'Homepage - Find your favourite movies' },
]

export default routes;
