import type {NextPage} from 'next'
import {Container, Typography} from "@mui/material";


const Home: NextPage = () => {
    return (
        <Container maxWidth={"xl"}>
            <Typography component={"h1"}>
                FoodFactory
            </Typography>
        </Container>
    )
}

export default Home
