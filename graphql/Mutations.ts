import {gql} from '@apollo/client'

export const CREATE_RECIPE = gql`mutation create_recipe ($details: String!, $miniature: String!, $name: String!, $profile_id: Int!, $public: Int!, $short_details:String!, $slug: String!) {
    insert_recipes_one(object: {details: $details, miniature: $miniature, name: $name, profile_id: $profile_id, public:$public, short_details:$short_details, slug:$slug}) {
        id
        name
    }
}
`

export const CREATE_RECIPE_INGREDIENT = gql`mutation insert_ingredients_in_recipe($objects: [Ingredients_insert_input!]!)
{
    insert_Ingredients(
        objects: $objects
    ) {
        returning {
            id
        }
    }
}`

export const DELETE_RECIPE = gql`mutation delete_recipe($id: Int!) {
    delete_recipes_by_pk(id:$id) {
        name
    }
}`;

export const DELETE_RECIPE_INGREDIENTS = gql`mutation delete_recipe_ingredients($recipe_id: Int!) {
    delete_Ingredients(
        where: { recipe_id: {_eq: $recipe_id}}
    ) {
        affected_rows
    }
}`