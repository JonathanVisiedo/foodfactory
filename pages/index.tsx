import type {NextPage} from 'next'
import Head from 'next/head'
import Header from "../components/partials/Header";
import {Typography} from "@mui/material";


const Home: NextPage = () => {
    return (
        <div>
            <Typography component={"h1"}>
                FoodFactory
            </Typography>
        </div>
    )
}

export default Home
