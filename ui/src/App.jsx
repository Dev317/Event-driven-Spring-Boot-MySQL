import { useState, useEffect } from 'react'
import './App.css'
import { 
  TextField,
  Button,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'
import axios from 'axios'

function App() {
  const ADMIN_API_URL = "http://localhost:8080/admin/publish"
  const INVENTORY_API_URL = "http://localhost:8081/inventory/"

  const [inventoryName, setInventoryName] = useState("")
  const [inventoryQuantity, setInventoryQuantity] = useState("")
  const [inventoryList, setInventoryList] = useState([])


  useEffect(() => {
    getInventory()
  }, [])

  const getInventory = () => {
    axios
      .get(INVENTORY_API_URL)
      .then((res) => {
        setInventoryList(res.data)
      })
  }

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
      .post(ADMIN_API_URL, body)
      .then(res => {
        setInventoryName("");
        setInventoryQuantity("");
        getInventory();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <div>
        <h2>Inventory submit form</h2>

        <FormControl>
          <TextField margin="normal" id="inventory-name" label="Inventory Name" value={inventoryName} variant="outlined" onChange={(e) => { setInventoryName(e.target.value)}}/>
          <TextField margin="normal" id="inventory-quantity" label="Inventory Quantity" value={inventoryQuantity} variant="outlined" onChange={(e) => { setInventoryQuantity(e.target.value)}}/>
          <Button margin="normal" variant="contained" component="label" size="large" onClick={uploadInventory}>
              Upload
          </Button>
        </FormControl>
      </div>

      <div>
        <h2>Inventory updated table</h2>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Quantity (unit)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {inventoryList.map((inventory) => (
              <TableRow
                key={inventory.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{inventory.id}</TableCell>
                <TableCell align="right">{inventory.inventoryName}</TableCell>
                <TableCell align="right">{inventory.quantity}</TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    </div>
  )
}

export default App
