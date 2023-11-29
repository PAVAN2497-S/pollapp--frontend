export default function categoriesReducer(state, action) {
   switch (action.type) {
      case 'SET_CATEGORIES': {
         return { ...state, data: action.payload }
      }
      case 'SET_SELECTED_POLLS': {
         return { ...state, selectedPolls: action.payload }
      }
      case 'CLEAR_SELECTED_POLLS': {
         return { ...state, selectedPolls: [] }
      }
      default: {
         return { ...state }
      }
   }
}