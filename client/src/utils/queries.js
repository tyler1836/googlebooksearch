import {gql} from '@apollo/client';

export const GET_ME = gql`
    type Query{
        me{
            _id
            username
            email
            savedBooks{
                bookId
                authors 
                description
                title
                image                
                link
               }
        }
    }
`