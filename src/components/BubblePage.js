import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import  fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = (props) => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    
    fetchColorService().then(res => {
      console.log(res)
      setColors(res.data)
    })
    
  },[])

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth().put(`/colors/${editColor.id}`, editColor)
      .then(res => {
        console.log(res)
        
        setColors([
          ...colors.filter((color) => 
            color.id !== editColor.id
          ), res.data

        ])
        
        
      })
      .catch(err => console.log(err))
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`/colors/${colorToDelete.id}`)
      .then(res => {
        console.log(res)
        setColors(
    
          colors.filter((color) => 
          color.id !== colorToDelete.id)
          
        )
      })
      .catch(err => console.log(err))
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
