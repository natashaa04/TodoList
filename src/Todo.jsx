import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState,useEffect } from 'react';
import AddSharpIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';


const getLocalItmes = () => {
  let list = localStorage.getItem('lists');

  if (list) {
      return JSON.parse(localStorage.getItem('lists'));
  } else {
      return [];
  }
}

const Todo=()=>{
    const [inputList,setinputlist]=useState("");
    const [data ,add_data]=useState(getLocalItmes);
    const [toggle_submit,set_toggle_submit]=useState(true);
    const [is_edit_item,set_edit_item]=useState(null);

    const itemEvent=(e)=>{
      
            setinputlist(e.target.value);
    };
  
  const addItem=()=>{
      if(inputList && toggle_submit===true) {

          const allInputData = { id: new Date().getTime().toString(), name:inputList }
          add_data([...data, allInputData]);
          setinputlist('');
      }
      else if(inputList && !toggle_submit){
        add_data(
          
            data.map((elem)=>{
              if(elem.id===is_edit_item){return{...elem,name:inputList};}
              else return elem;
      }));
          
        
        set_toggle_submit(true);
        setinputlist("");
        set_edit_item(null);
      }
      else {alert('Please add an item');}

        
  };
  const delete_item=(id)=>{
    const updateditems = data.filter((elem) => {
      return id !== elem.id;
  });

     add_data(updateditems);
  }
  const edit_item=(id)=>{
    let item_to_edit=data.find((elem)=>{
      return elem.id===id;
    });
    set_toggle_submit(false);
    setinputlist(item_to_edit.name);
    set_edit_item(id);
  }
  const remove_all = () => {
    add_data([]);
}

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(data))
 }, [data]);



return (
   <><div className="main_div">
    
        <img src="https://img.freepik.com/free-photo/rag-doll-with-checklist-green-pencil_1156-216.jpg?size=338&ext=jpg&uid=R88680339&ga=GA1.2.750485497.1671986065&semt=ais" alt=''/>
        <h1>ToDo List</h1>
    <br/>
    
  <input type="text" placeholder='Add an Item' onChange={itemEvent}  value={inputList}/>
  {toggle_submit?<button onClick={addItem} className="add"><AddSharpIcon/></button>: <button className='edit-btnn'onClick={addItem}><BorderColorRoundedIcon/></button>}
  

  <ol>
  {data.map((item)=>{
        return (<div className='each-item' key={item.id}>
          <li>{item.name}</li>
        <button className='delete-btn' onClick={()=>{delete_item(item.id)}}><DeleteIcon/></button>
        <button className='edit-btn'onClick={()=>{edit_item(item.id)}}><BorderColorRoundedIcon/></button>
        </div>)
       })}
      
  </ol>

  <button className="clear-btn" onClick={remove_all}>Clear</button>
    
    </div>
    </>
);
}
export default Todo;