import type {NextPage} from 'next'
import {Container, Grid, Typography, useTheme} from "@mui/material";
import {useMutation, useQuery} from "@apollo/client";
import {FETCH_RECIPES} from "../graphql/Queries";
import Image  from 'next/image'
import {grey} from "@mui/material/colors";
import RecipeCard from "../components/RecipeCard";
import {DELETE_RECIPE} from "../graphql/Mutations";

const Home: NextPage = () => {

    const theme = useTheme()
    const { loading, error, data } = useQuery(FETCH_RECIPES)
    if(error) return <div>{error.message}</div>



    return (
        <Container maxWidth={"xl"} sx={{ paddingTop: theme.spacing(3)}}>
            <Grid container spacing={2}>
                {
                    data && data.recipes.map((recipe:any) => {
                        return (<Grid item  md={3}>
                            <RecipeCard recipe={recipe} />
                        </Grid>)
                    })
                }
            </Grid>
        </Container>
    )
}

export default Home
