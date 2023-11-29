import { useContext } from 'react'
import { CategoriesContext, PollsContext } from '../App'
import PollsList from './PollsList'
function Home() {
    const { pollsState } = useContext(PollsContext)
    const { categoriesState } = useContext(CategoriesContext)
    return (
        <div>
            <h2>Home Component</h2>
            <h2>Total Category-{categoriesState.data.length} || Active Polls - {pollsState.activePolls.length}</h2>
            <h2> </h2>
            <PollsList polls={pollsState.activePolls} />
        </div>
    )
}

export default Home