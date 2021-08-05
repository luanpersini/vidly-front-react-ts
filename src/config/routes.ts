import { Customers } from '../components/customers';
import NotFound from "../components/notFound";
import Login from '../pages/auth/Login';
import Logout from '../pages/auth/Logout';
import Register from '../pages/auth/Register';
import Movies from "../pages/Movies";
import { Route } from "../protocols/route";

const user = {
    _id: { $oid: '60a178327476cd104886862f' },
    name: 'Luan PSG',
    email: 'luanpsg@gmail.com',
    password: '$2b$10$RX4j/xWlLQgViqNHPgUZYuFQsYC2yTGuZ3pQ2zN33dItpURq3aCHi'
  }


const mainRoutes: Route[] = [
    {
        path: '/',
        title: 'Movies',
        component: Movies,
        exact: true,
        props: {user: user}
    }, 
    {
        path: '/movies',
        title: 'Movies',
        component: Movies,
        exact: true,
        props: {user: user}
    },   
    {
        path: '/customers',
        title: 'Customers',
        component: Customers,
        exact: true
    }
]

const authRoutes: Route[] = [
    {
        path: '/register',
        title: 'Register',
        component: Register,
        exact: true
    }, 
    {
        path: '/login',
        title: 'Login',
        component: Login,
        exact: true
    },   
    {
        path: '/logout',
        title: 'Logout',
        component: Logout,
        exact: true
    }
]

const notFound: Route[] = [
{
    path: '*',
    title: 'Not Found',
    component: NotFound,
    exact: true
}
]
const routes: Route[] = [...mainRoutes, ...authRoutes, ...notFound]

export default routes;