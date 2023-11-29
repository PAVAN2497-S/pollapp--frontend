
import { UserContext } from "../App"
import { useContext } from "react"
import PollsList from "./PollsList"
function MyPolls() {
   const { userState } = useContext(UserContext)
   return (
      <div>
         <h1>my polls</h1>
         <h2>Total-{userState.myPolls.length}</h2>
         <PollsList polls={userState.myPolls} />
      </div>
   )
}
export default MyPolls