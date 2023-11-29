import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
import MyPolls from './components/MyPolls'
import userReducer from './reducers/user-reducer'
import pollsReducer from './reducers/polls-reducer'
import categoriesReducer from './reducers/categories-reducer'
import NewPoll from './components/Newpoll'
import PollShow from './components/PollShow'
import SinglePoll from './components/SinglePoll'
import SingleCategory from './components/SingleCategory'
import axios from './config/axios'
import { useReducer, createContext, useEffect } from 'react'

export const UserContext = createContext()
export const PollsContext = createContext()
export const CategoriesContext = createContext()
export function App() {
    const [userState, userDispatch] = useReducer(userReducer, { user: {}, myPolls: [], myVotes: [] })

    const [pollsState, pollsDispatch] = useReducer(pollsReducer, { activePolls: [] })
    const [categoriesState, categoriesDispatch] = useReducer(categoriesReducer, { data: [], selectedPolls: [] })
    useEffect(() => {
        if (localStorage.getItem('token')) {//handling page reload
            (async () => {
                try {
                    const response = await axios.get('/api/users/account', {
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    })
                    userDispatch({ type: 'USER_LOGIN', payload: response.data })

                    const pollsResponse = await axios.get('/api/polls/mypolls', {
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    })
                    userDispatch({ type: 'SET_MY_POLLS', payload: pollsResponse.data })

                    const votesResponse = await axios.get('/api/votes/myvotes', {
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        }
                    })
                    userDispatch({ type: 'SET_MY_VOTES', payload: votesResponse.data })

                } catch (e) {
                    alert(e.message)
                }
            })()
        }
        (async () => {
            try {
                const responses = await Promise.all([await axios.get('/api/polls/active'), await axios.get('/api/categories')])
                const pollsResponse = responses[0].data
                const categoriesResponse = responses[1].data
                pollsDispatch({ type: 'SET_ACTIVE_POLLS', payload: pollsResponse })
                categoriesDispatch({ type: 'SET_CATEGORIES', payload: categoriesResponse })
            } catch (e) {
                alert(e)
            }
        })()
    }, [])

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ userState, userDispatch }}>
                <PollsContext.Provider value={{ pollsState, pollsDispatch }}>
                    <CategoriesContext.Provider value={{ categoriesState, categoriesDispatch }}>
                        <div>
                            <h1>Polling App</h1>
                            <NavBar />

                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/login" element={<Login />} />
                                <Route path='/dashboard' element={<Dashboard />} />
                                <Route path='/polls/new' element={<NewPoll />} />
                                <Route path='/polls/my-polls' element={<MyPolls />} />
                                <Route path='/mypolls/:id' element={<PollShow />} />
                                <Route path='/polls/:id' element={<SinglePoll />} />
                                <Route path='/polls/category/:name' element={<SingleCategory/>} />
                            </Routes>
                        </div>
                    </CategoriesContext.Provider>
                </PollsContext.Provider>
            </UserContext.Provider>
        </BrowserRouter>
    )
}
