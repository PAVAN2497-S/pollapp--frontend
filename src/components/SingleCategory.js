import { useEffect, useContext } from "react"
import { CategoriesContext } from "../App"
import { useParams } from "react-router-dom"
import axios from "../config/axios"
import PollsList from "./PollsList"
function SingleCategory() {
   const { categoriesDispatch, categoriesState } = useContext(CategoriesContext)
   const { name } = useParams()
   useEffect(() => {
      (async () => {
         try {
            const response = await axios.get(`/api/polls/category/${name}`)
            categoriesDispatch({ type: 'SET_SELECTED_POLLS', payload: response.data })
         } catch (e) {
            console.log(e)
         }
      })()
   }, [])

   useEffect(() => { // unmounting 
      return () => {
         categoriesDispatch({ type: 'CLEAR_SELECTED_POLLS' })
      }
   }, [])
   return (
      <div>
         <h2>selected category-{name}</h2>
         <h2>total polls-{categoriesState.selectedPolls.length}</h2>
         <PollsList polls={categoriesState.selectedPolls} />
      </div>
   )

}
export default SingleCategory