import React from 'react'

const Homepage = React.lazy(() => import('../views/containers/homepage/Page'))
const Favourite = React.lazy(() => import('../views/containers/favourite/Page'))

const routes = [
    { path: '/', exact: true, name: 'Homepage', component : Homepage, title : 'Homepage - Find your favourite movies' },
    { path: '/favourite', exact: true, name: 'Favourite', component : Favourite, title : 'Favourite - List your favourite movies' },
]

export default routes;
