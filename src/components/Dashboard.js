import { useContext } from 'react'
import { UserContext } from '../App'
function Dashboard() {
    const { userState } = useContext(UserContext)
    return (
        <div>
            <h2>Dashboard Component</h2>
            <p>Welcome, {userState.user.username}!</p>
            <p>total Polls-{userState.myPolls.length}</p>
        </div>
    )
}   

export default Dashboard