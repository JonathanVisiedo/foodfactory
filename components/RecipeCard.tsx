import {Card, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@mui/material";
import React from "react";
import {DeleteOutline} from "@mui/icons-material";
import {useMutation} from "@apollo/client";
import {DELETE_RECIPE} from "../graphql/Mutations";
import {FETCH_RECIPES} from "../graphql/Queries";


const RecipeCard = ({recipe}: {recipe:any}) => {

    const [deleteRecipe, {error:deleteError, loading: deleteLoading}] = useMutation(DELETE_RECIPE, {
        refetchQueries: [
            FETCH_RECIPES, // DocumentNode object parsed with gql
            'fetchRecipes' // Query name
        ]
    })

    const handleDelete:any = (id:any) => {
        deleteRecipe({
            variables: {
                id
            }
        })
    }

    return <Card elevation={1}>
        <CardHeader
            title={recipe.name}
            action={
                <IconButton onClick={() => handleDelete(recipe.id)}>
                    <DeleteOutline/>
                </IconButton>
            }
        />
        <CardMedia
            component="img"
            height="350"
            image={`/${recipe.miniature}`}
            alt={recipe.name}
        />
        <CardContent>
            <Typography variant={"body2"} color={"textSecondary"}>{recipe.short_details}</Typography>
        </CardContent>
    </Card>

}

export default RecipeCard