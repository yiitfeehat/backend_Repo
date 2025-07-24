import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Container } from '@mui/material'
import React, { useState } from 'react'
import PurchasesTable from '../components/Table/PurchasesTable'
import useStockCall from '../hook/useStockCall'
import { useEffect } from 'react'
import PurchasesModal from "../components/Modal/PurchasesModal"
import { useSelector } from 'react-redux'
import { getPurcBrandProSuccess } from '../features/stockSlice'


const Purchases = () => {
  const {getStockData, getPurcBrandPro}=useStockCall()
  const { loading, error } = useSelector((state) => state.stock);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [initialState,setInitialState]=useState({
      brandId: "",
      firmId: "",
      productId: "",
      quantity: "",
      price: "",

      })
    
   
  useEffect(()=>{
    // getStockData("purchases")
    // getStockData("brands")
    // getStockData("products")
    getPurcBrandPro()
  },[])

  return (
    <Container maxWidth={"xl"}>
    <Typography
      align="center"
      variant="h4"
      component="h1"
      color="secondary.second"
      
    >
      Purchases
    </Typography>
    {loading ? (
      <Typography
        align="center"
        variant="h5"
        component="h3"
        color="secondary.second"
      >
        Loading....
      </Typography>
    ) : error ? (
      <Typography align="center" variant="h5" component="h3" color="error">
        Something went wrong...
      </Typography>
    ) : (
      <>
        <Button variant="contained" onClick={handleOpen} sx={{marginBottom:"0.5rem"}}>
          New Purchase
        </Button>

        <PurchasesTable  handleOpen={handleOpen} setInitialState={setInitialState} />

        {open && (
          <PurchasesModal
            open={open}
            handleClose={handleClose}
            initialState={initialState}
          />
        )}
      </>
    )}
  </Container>
   
  )
}

export default Purchases