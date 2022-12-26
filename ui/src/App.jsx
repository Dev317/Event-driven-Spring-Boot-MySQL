import { useState } from 'react'
import './App.css'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios'

function App() {
  const API_URL = "http://localhost:8080/admin/publish"
  const [inventoryName, setInventoryName] = useState("")
  const [inventoryQuantity, setInventoryQuantity] = useState("")

  const uploadInventory = (e) => {
    e.preventDefault();

    const body = {
      message: "create new inventory",
      inventory: {
        inventoryName: inventoryName,
        quantity: parseInt(inventoryQuantity)
      }
    }

    axios
    .post(API_URL, body)
    .then(res => {
      console.log(res);
      console.log(res.data);
      setInventoryName("");
      setInventoryQuantity("");

    })
    .catch(function (error) {
      console.log(error);
    });

  }


  return (
    <div className="App">
      <h2>Inventory submit form</h2>

      <div style={{ "marginBottom": "5px" }}>
        <TextField id="inventory-name" label="Inventory Name" value={inventoryName} variant="outlined" onChange={(e) => { setInventoryName(e.target.value)}}/>
      </div>

      <div style={{ "marginBottom": "5px" }}>
        <TextField id="inventory-quantity" label="Inventory Quantity" value={inventoryQuantity} variant="outlined" onChange={(e) => { setInventoryQuantity(e.target.value)}}/>
      </div>
        <Button variant="contained" component="label" size="large" onClick={uploadInventory}>
          Upload
        </Button>

    </div>
  )
}

export default App
