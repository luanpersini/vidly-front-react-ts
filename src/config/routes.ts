import { NotFound } from '../components/common/not-found'
import { Route } from '../interfaces/route'
import { Login } from '../pages/auth/Login'
import { Logout } from '../pages/auth/Logout'
import { Register } from '../pages/auth/Register'
import { Customers } from '../pages/customers'
import { MovieForm } from '../pages/movies/movieForm'
import { Movies } from '../pages/movies/Movies'
import { Profile } from '../pages/profile'
import Rentals from '../pages/rentals'

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
    auth: false,
    props: { user: user }
  },
  {
    path: '/movies',
    title: 'Movies',
    component: Movies,
    exact: true,
    auth: false,
    props: { user: user }
  },
  {
    path: '/movies/:id',
    title: 'Edit Movie',
    auth: true,
    component: MovieForm,
    exact: true
  },
  {
    path: '/customers',
    title: 'Customers',
    auth: false,
    component: Customers,
    exact: true
  },
  {
    path: '/rentals',
    title: 'Rentals',
    auth: true,
    component: Rentals,
    exact: true
  },
  {
    path: '/profile',
    title: 'Profile',
    auth: true,
    component: Profile,
    exact: true
  }
]

const authRoutes: Route[] = [
  {
    path: '/register',
    title: 'Register',
    component: Register,
    exact: true,
    auth: false
  },
  {
    path: '/login',
    title: 'Login',
    component: Login,
    exact: true,
    auth: false
  },
  {
    path: '/logout',
    title: 'Logout',
    component: Logout,
    exact: true,
    auth: false
  }
]

const notFound: Route[] = [
  {
    path: '/notfound/:id',
    title: 'Not Found',
    component: NotFound,
    exact: true,
    auth: false
  },
  {
    path: '*',
    title: 'Not Found',
    component: NotFound,
    exact: true,
    auth: false
  }
]
const routes: Route[] = [...mainRoutes, ...authRoutes, ...notFound]

export default routes
