import { gql } from "@apollo/client";

export const FETCH_RECIPES = gql`query fetchRecipes {
    recipes {
        id
        name
        slug
        details
        short_details
        miniature
        public
        profile_id
        Ingredients {
            barcode
            name
            quantity
        }
    }
}
`


export const FETCH_RECIPE_INGREDIENTS = gql`query fetchIngredients($recipe_id: Int_comparison_exp) {
    Ingredients(where: {recipe_id: $recipe_id}) {
        id
        barcode
        name
        quantity
    }
}`