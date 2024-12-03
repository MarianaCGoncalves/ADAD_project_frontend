import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { openContractCall } from '@stacks/connect';
import {
  bufferCV,
} from '@stacks/transactions';
import { utf8ToBytes } from '@stacks/common';
import { userSession } from '../auth';
const bytes = utf8ToBytes('foo'); 
const bufCV = bufferCV(bytes);

export default function App() {
  let params = useParams();
  let [book, setBook] = useState([]);

 

  useEffect(() => {
    let id = params._id;
    console.log(id);
    const getBook = async (id) => { 
      try { const response = await fetch(`http://localhost:3000/book/id/${id}`); 
            const data = await response.json
    } catch (error){
      console.error('Error:', error);
    }
  }
    getBook(params._id);

  }, [params._id]);

  return (
    <div className="container pt-5 pb-5">
      <h2>Book page</h2>
      
    </div>
  )
}