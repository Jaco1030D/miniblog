import { useEffect, useReducer, useState } from "react";
import {db} from '../firebase/Config'
import { doc, deleteDoc } from "firebase/firestore";

const initialstate = {
    loading: null,
    error: null
}
const deleteReducer = (state, action) =>{
    switch (action.type) {
        case "LOADING":
            
            return {loading: true, error:null}
        case "DELETE_DOC":
            return {loading: false, error:null}
        case "ERROR":
            return {loading: false, error:action.payload}
        default:
            return state
    }
}

export const useDeleteDocuments = (docCollection) => {
    const [response, dispatch] = useReducer(deleteReducer, initialstate)
    
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) =>{
        if (!cancelled) {
            dispatch(action)
        }
    }

    const deleteDocument = async(id) =>{
        checkCancelBeforeDispatch({
            type: "LOADING"
        })
        try {
            const deleteDocument = await deleteDoc(doc(db, docCollection, id))
           
            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: deleteDocument,
            })
        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })
        }
    }
    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {deleteDocument, response}
}