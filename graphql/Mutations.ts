import {gql} from '@apollo/client'

export const CREATE_RECIPE = gql`
    mutation ($details: String!, $miniature: String!, $name: String!, $profile_id: ID!, $public: Boolean!, $short_details:String!, $slug: String!) {
        insert_recipes_one(objects: {details: $details, miniature: $miniature, name: $name, profile_id: $profile_id, public:$public, short_details:$short_details, slug:$slug}) {
            affected_rows
            returning {
                id
                title
                created_at
                is_completed
            }
        }
    }
`
