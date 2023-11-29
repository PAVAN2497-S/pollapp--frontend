import { useState, useEffect,useContext } from "react"
import axios from 'axios'
import { UserContext } from "../App"
import { useNavigate } from "react-router-dom"

function NewPoll() {
   const navigate = useNavigate()
   const [question, setquestion] = useState('')
   const [categoryId, setCategoryId] = useState('')
   const [categoryName, setCategoryName] = useState('')
   const [categories, setCategories] = useState([])
   const [endDate, setEndDate] = useState('')
   const [options, setOptions] = useState([])

   const { userDispatch } = useContext(UserContext)

   useEffect(() => {
      (async () => {
         try {
            const response = await axios.get('http://localhost:3090/api/categories')
            setCategories(response.data)
         } catch (e) {
            alert(e.message)
         }

      })()
   }, [])

   const handleAdd = async () => {
      if (categoryName) {
         const formData = {
            name: categoryName
         }
         try {
            const response = await axios.post('http://localhost:3090/api/categories', formData, {
               headers: {
                  "Authorization": localStorage.getItem('token')
               }
            })
            setCategories([...categories, response.data])
            //setCategoryId(category._id)
            setCategoryName('')
         } catch (e) {
            alert(e.message)
         }
      }
      setCategoryName('')
   }

   const handleOptionText = (index, value) => {
      const newArr = options.map((ele, i) => {
         if (i === index) {
            return { ...ele, optionText: value }
         } else {
            return { ...ele }
         }
      })
      setOptions(newArr)
   }

   const handleAddOption = () => {
      const option = {
         optionText: ''
      }
      setOptions([...options, option])
   }

   const handleRemoveOption = (index) => {
      const newArr = options.filter((ele, i) => {
         return i !== index
      })
      setOptions(newArr)
   }

   const handleSubmit = async () => {
      const today = new Date()
      const formData = {
         question: question,
         endDate: endDate,
         createdDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
         categoryId: categoryId,
         options: options
      }

      try {
         const response = await axios.post('http://localhost:3090/api/polls', formData, {
            headers: {
               'Authorization': localStorage.getItem('token')
            }
         })
         console.log(response.data)
         const poll = response.data
         userDispatch({ type: 'ADD_MY_POLL', payload: poll })
         setquestion('')
         setEndDate('')
         setCategoryId('')
         setOptions([])
         navigate(`/mypolls/${poll._id}`)
      } catch (e) {
         alert(e.message)
      }

   }
   return (
      <div>
         <h2>Add Poll</h2>
         <label>add question</label><br />
         <input type='text' value={question} onChange={(e) => {
            setquestion(e.target.value)
         }} /><br />
         <label>category</label><br />
         <select value={categoryId} onChange={(e) => { setCategoryId(e.target.value) }}>
            <option value=''>select</option>
            {categories.map((ele, i) => {
               return <option value={ele._id} key={i}>{ele.name}</option>
            })}
         </select>or
         <input placeholder="add category" type="text" value={categoryName} onChange={(e) => { setCategoryName(e.target.value) }} />
         <button onClick={handleAdd}>add category</button><br />
         <label>end date</label><br />
         <input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value) }} /><br />
         <label>add options</label><br />
         {options.map((ele, i) => {
            return <div key={i}>
               <input type="text" value={ele.optionText} onChange={(e) => {
                  handleOptionText(i, e.target.value)
               }} />
               <button onClick={() => { handleRemoveOption(i) }}>remove option</button>
            </div>
         })}
         <button onClick={handleAddOption}>add option</button><br /><br />
         <button onClick={handleSubmit}>submit</button>
      </div>
   )

}
export default NewPoll