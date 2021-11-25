import {Grid, TextField} from "@mui/material";
import {useState} from "react";



const IngredientForm = ({ ingredient, updateIngredient, itemKey }:any) => {

    const [barcode, setBarcode] = useState('')
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(0)

    // check why it's a promise ?
    const fetchBarcode = async (code:string) => {
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
        const data = await response.json()
        return data
    }

    const updateBarcode = (e:any) => {
        const inputBarcode = e.target.value
        setBarcode(inputBarcode)

        const data = fetchBarcode(inputBarcode)
            .then(data => {

                if(data.status==1) {
                    setName(data.product.product_name)
                    updateIngredient(itemKey, {
                        key: itemKey,
                        barcode: inputBarcode,
                        name: data.product.product_name,
                        quantity
                    })
                }


            })
    }

    const updateName = (e:any) => {
        setName(e.target.value)
        updateIngredient(itemKey, {
            key: itemKey,
            barcode,
            name,
            quantity
        })
    }

    const updateQuantity = (e:any) => {
        setQuantity(e.target.value)
        updateIngredient(itemKey, {
            key: itemKey,
            barcode,
            name,
            quantity
        })
    }

    return <>
        <Grid item xs={12} sm={6} md={4} >
            <TextField
                id={"ingredient_barcode"}
                onChange={e => updateBarcode(e)}
                sx={{my: 2}}
                label={"Ingredient barcode"}
                variant={"outlined"}
                size={"small"}
                fullWidth
                required
                value={barcode}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={4} >
            <TextField
                id={"ingredient_name"}
                onChange={(e) => updateName(e)}
                sx={{my: 2}}
                label={"Ingredient name"}
                variant={"outlined"}
                size={"small"}
                fullWidth
                required
                value={name}
            />
        </Grid>
        <Grid item xs={12} sm={6} md={4} >
            <TextField
                id={"ingredient_quantity"}
                onChange={(e) => updateQuantity(e)}
                sx={{my: 2}}
                label={"Ingredient quantity (g)"}
                variant={"outlined"}
                size={"small"}
                fullWidth
                required
                value={quantity}
            />
        </Grid>
    </>


}

export default IngredientForm