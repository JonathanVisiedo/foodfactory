import {useUser, withPageAuthRequired} from "@auth0/nextjs-auth0";
import {Box, Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {useReducer, useState} from "react";
import {NextPage} from "next";
import Ingredient from "../../../components/form/IngredientForm";
import IngredientForm from "../../../components/form/IngredientForm";

const RecipeCreate:NextPage = () => {

    const {user, error, isLoading} = useUser();

    if (isLoading) <div>Loading...</div>
    if (error) <div>{error.message}</div>

    const Heading = styled(Box)`
      padding: ${({theme}) => theme.spacing(3)};
      background: white;
      box-shadow: ${({theme}) => theme.shadows[3]};
      margin-bottom: ${({theme}) => theme.spacing(3)}
    `

    const handleSubmit = (e:Event) => {
        e.preventDefault()
    }

    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [shortDetails, setShortDetails] = useState('')
    const [key, setKey] = useState(0)
    const [ingredients, setIngredients] = useState([
        {key, barcode: '', name: '', quantity: ''}
    ]);


    const updateIngredient = (key, state) => {

        const index = ingredients.findIndex(item => item.key == key)
        let newIngredient = ingredients
        newIngredient[index] = state
        setIngredients(newIngredient)

        console.log(ingredients)
    }

    const addIngredient = () => {
        setIngredients(ingredients.concat({key:key+1, barcode:"", name:"", quantity:""}))
        setKey(key+1)
    }

    return <>
        <Heading>
            <Container maxWidth={"xl"}>
                <Typography variant={"h4"} gutterBottom>Create a new recipe</Typography>
            </Container>
        </Heading>
        <Container maxWidth={"xl"}>
            <form
                noValidate
                autoComplete={"off"}
                onSubmit={(e) => handleSubmit(e)}
            >
                <Paper sx={{p: 2, mb:4}} elevation={2}>
                    <Typography>
                        Recipe information
                    </Typography>
                    <TextField
                        id={"title"}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{my: 2}}
                        label={"Recipe name"}
                        variant={"outlined"}
                        size={"small"}
                        fullWidth
                        required
                        value={title}
                    />

                    <TextField
                        id={"short_details"}
                        onChange={(e) => setShortDetails(e.target.value)}
                        sx={{my: 2}}
                        label={"Recipe short details"}
                        variant={"outlined"}
                        size={"small"}
                        multiline
                        rows={2}
                        fullWidth
                        required
                        value={shortDetails}
                    />

                    <TextField
                        id={"details"}
                        onChange={(e) => setDetails(e.target.value)}
                        sx={{my: 2}}
                        label={"Recipe details"}
                        variant={"outlined"}
                        size={"small"}
                        multiline
                        rows={4}
                        fullWidth
                        required
                        value={details}
                    />

                </Paper>
                <Paper sx={{p:2, mb:4}} elevation={2}>
                    <Typography>
                        Recipe ingredients
                    </Typography>

                    <Grid container spacing={1}>
                        {
                            ingredients.map((ingredient) => {
                                return <IngredientForm ingredient={ingredient} updateIngredient={updateIngredient} key={ingredient.key} itemKey={ingredient.key}/>
                            })
                        }
                    </Grid>

                    <Grid container>
                        <Grid item xs={12}>
                            <Button onClick={() => addIngredient()}>Add</Button>
                        </Grid>
                    </Grid>

                </Paper>
            </form>

        </Container>
    </>

}

export default withPageAuthRequired(RecipeCreate)
