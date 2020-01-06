import Home from './pages/Home';
import About from './pages/About';
import Detail from './pages/Detail';
import Search from './pages/Search'
import Category from './pages/Category';

import loadData from './helper/loadData'

const Routes = [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/About",
        exact: true,
        component: About
    },
    {
        path: "/Detail/:id/:nama_kost",
        exact: true,
        component: Detail,
        loadData: ()=> loadData("Detail")
    },
    {
        path: "/Search/:searchQuery",
        exact: true,
        component: Search
    },
    {
        path: "/Category/:CategoryName",
        exact: true,
        component: Category
    }
]

export default Routes;