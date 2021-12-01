import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {DeleteOutline} from "@mui/icons-material";
import {useMutation} from "@apollo/client";
import {DELETE_RECIPE, DELETE_RECIPE_INGREDIENTS} from "../graphql/Mutations";
import {FETCH_RECIPES} from "../graphql/Queries";


const RecipeCard = ({recipe}: {recipe:any}) => {

    const [deleteRecipe, {error:deleteError, loading: deleteLoading}] = useMutation(DELETE_RECIPE, {
        refetchQueries: [
            FETCH_RECIPES, // DocumentNode object parsed with gql
            'fetchRecipes' // Query name
        ]
    })
    const [deleteIngredients, { error: ingredientDeleteError, loading: ingredientDeleteLoading}] = useMutation(DELETE_RECIPE_INGREDIENTS)

    const handleDelete:any = async (id:any) => {

        await fetch(`http://localhost:3000/api/files?path=${recipe.miniature}`, {
            method: "DELETE",
            headers: {Accept: 'application/json','Content-Type': 'application/json'}
        });

        deleteIngredients({
            variables: {
                recipe_id: id
            }
        })
            .then(r => {
                deleteRecipe({
                    variables: {
                        id
                    }
                })
                    .then(r => {
                        console.log(r)
                    })
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
            <List sx={{margin:0}}>
                {
                    recipe.Ingredients && recipe.Ingredients.map((ingredient:any) => {
                        return <ListItem key={`a${ingredient.name}`}>
                            <ListItemText primary={ingredient.name} secondary={`${ingredient.quantity} g`}/>
                        </ListItem>
                    })
                }
            </List>
        </CardContent>
    </Card>

}

export default RecipeCard