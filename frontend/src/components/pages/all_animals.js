import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "../../styles/table.css"
 
 
export default function AnimalList() {
  const [animals, setAnimals] = useState([]);
 
  // This method fetches the animals from the database.
  useEffect(() => {
    async function getAnimals() {
      let response = ""

      if(process.env.NODE_ENV === "production"){
        response = await fetch(`/animal/all`);
      }
      else{
        response = await fetch("http://localhost:5000/animal/all")
      }

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const animals = await response.json();
      setAnimals(animals);
    }

    getAnimals();

    return;
  }, [animals.length]);
 

 const [columns] = useState([
  { field: 'name', filter:true, resizable: true, editable:true },
  { field: 'age', filter:true, resizable:true, editable: true},
  { field: 'breed', filter:true, resizable: true, editable: true },
  { field: 'color', filter:true, resizable:true, editable:true  },
  { field: 'outcome_type', filter:true, resizable:true, editable: true },
  { field: 'gender', filter:true, resizable:true, editable: true },
  { field: 'location_lat', filter:true, resizable: true, editable: true},
  { field: 'location_long', filter: true, resizable:true, editable:true },
  { field: 'age_weeks', filter:true, resizable: true, editable: true },
  { field: 'reserved', filter:true, resizable: true, editable: true}
])


 // This following section will display the table with all animals
  return (
  <div>
    <div className="header">
      <h3>All Animals</h3>
    </div>
    <div className="body">
      <div className="ag-theme-alpine" style={{height: 700, width: 1200}}>
              <AgGridReact
                  rowData={animals}
                  columnDefs={columns}
                  pagination={true}
                  paginationPageSize={14}
                  >   
              </AgGridReact>
      </div>
    </div>
  </div>
);
}
