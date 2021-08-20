import React, { useEffect, useState } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../helpers/axiosWithAuth";
import  fetchColorService from '../services/fetchColorService';

const BubblePage = (props) => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  
  useEffect(() => {
    
    fetchColorService().then(response => {
      console.log(response)
      setColors(response.data)
    })
    
  },[])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth().put(`/colors/${editColor.id}`, editColor)
      .then(response => {
        console.log(response)
        
        setColors([
          ...colors.filter((color) => 
            color.id !== editColor.id
          ), response.data

        ])
      })
      .catch(error => console.log(error))
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`/colors/${colorToDelete.id}`)
      .then(response => {
        console.log(response)
        setColors(
    
          colors.filter((color) => 
          color.id !== colorToDelete.id)
          
        )
      })
      .catch(error => console.log(error))
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
