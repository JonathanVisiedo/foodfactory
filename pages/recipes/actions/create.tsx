import {useUser, withPageAuthRequired} from "@auth0/nextjs-auth0";
import {Box, Button, ButtonGroup, Container, Grid, Paper, TextField, Typography, useTheme} from "@mui/material";
import styled from "@emotion/styled";
import {ChangeEvent, useEffect, useState} from "react";
import {NextPage} from "next";
import IngredientForm from "../../../components/form/IngredientForm";
import Ckeditor from "../../../components/form/Editor";
import {grey} from "@mui/material/colors";
import {Cloud, Send} from "@mui/icons-material";
import slugify from 'react-slugify';
import {useMutation} from "@apollo/client";
import {CREATE_RECIPE} from "../../../graphql/Mutations";

const RecipeCreate: NextPage = () => {

    const {user, error, isLoading} = useUser();
    const theme = useTheme()
    const [addRecipe] = useMutation(CREATE_RECIPE)
    if (isLoading) <div>Loading...</div>
    if (error) <div>{error.message}</div>

    const Heading = styled(Box)`
      padding: ${theme?.spacing(3)};
      background: white;
      box-shadow: ${theme?.shadows[3]};
      margin-bottom: ${theme?.spacing(3)}
    `

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const recipe = {
            name: title,
            slug,
            miniature,
            public: 1,
            profile_id: 1,
            details,
            short_details: shortDetails,
            ingredients
        }

        addRecipe({variables: recipe})
            .then(res => {
                console.log(res)
            })
        console.log(recipe)
    }

    const [key, setKey] = useState(0)
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [shortDetails, setShortDetails] = useState('')
    const [details, setDetails] = useState('')
    const [image, setImage] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [miniature, setMiniature] = useState(null)
    const [ingredients, setIngredients] = useState([
        {key, barcode: '', name: '', quantity: ''}
    ]);


    const uploadToClient = (event:any) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
        }
    };

    const uploadToServer = async (event:any) => {
        const body = new FormData();
        if(image != null) {
            body.append("file", image);
            const response = await fetch("/api/files", {
                method: "POST",
                body
            });
            const file = await response.json()

            setIsUploaded(true)
            setMiniature(file.fileName)
        }

    };

    const updateIngredient = (key: number, state: any) => {

        const index = ingredients.findIndex(item => item.key == key)
        let newIngredient: any = ingredients
        newIngredient[index] = state
        setIngredients(newIngredient)
    }

    const addIngredient = () => {
        setIngredients(ingredients.concat({key: key + 1, barcode: "", name: "", quantity: ""}))
        setKey(key + 1)
    }

    const removeIngredient = () => {
        ingredients.pop();
        setIngredients(ingredients)
        setKey(key - 1)
    }


    useEffect(() => {
        console.log(`action triggered`)
        console.log(`key: ${key}`)
        console.log(`title: ${title}`)
        console.log(`shortDetails: ${shortDetails}`)
        console.log(`details: ${details}`)
        console.log(`miniature`, miniature)
        console.log(ingredients)
    }, [updateIngredient])

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
                <Paper sx={{p: 2, mb: 4}} elevation={2}>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems:"center", marginBottom: theme.spacing(3)}}>
                        <Typography component={"h3"} variant={"h3"}>
                            Recipe information
                        </Typography>
                        <Button variant={"contained"} type={"submit"} endIcon={<Send/>}>Create</Button>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <Grid container>
                                <Grid item xs={12} sx={{ marginBottom: theme.spacing(2)}}>
                                    <TextField
                                        id={"title"}
                                        onChange={(e: any) => {
                                            setTitle(e.target.value)
                                            setSlug(slugify(e.target.value))
                                        }
                                        }
                                        sx={{my: 2}}
                                        label={"Recipe name"}
                                        variant={"outlined"}
                                        size={"small"}
                                        fullWidth
                                        required
                                        value={title}
                                    />
                                    <Typography variant={"body2"} color={grey[400]}>
                                        /recipes/{slug}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>

                                    <TextField
                                        id={"short_details"}
                                        onChange={(e: any) => setShortDetails(e.target.value)}
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
                                </Grid>

                                <Grid item xs={12}>
                                    <Ckeditor updateText={setDetails}/>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} md={4} sx={{display: "flex", alignItems: "center", paddingLeft: `${theme?.spacing(3)}`, paddingRight: `${theme.spacing(1)}`}}>
                            <Grid container sx={{border: `2px dashed ${grey[300]}`, height: "100%"}}>
                                <Grid item xs={12} sx={{display: "flex", justifyContent: "center", alignItems: "center", padding: theme.spacing(2)}}>
                                    {
                                        image ? <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"center"}}>
                                                <img src={createObjectURL} width={"100%"} />
                                                {
                                                    !isUploaded ? <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
                                                        <Button
                                                            sx={{my: 2}}
                                                            variant="contained"
                                                            component="label"
                                                        >
                                                            Change File
                                                            <input type="file" hidden accept="image/*"  onChange={uploadToClient}/>
                                                        </Button>
                                                        <Button
                                                            onClick={() => setImage(null)}
                                                            sx={{my:2, ml:2}}
                                                            variant={"contained"}
                                                        >cancel</Button>
                                                        <Button
                                                            endIcon={<Cloud />}
                                                            sx={{my:2, ml:2}}
                                                            variant={"contained"}
                                                            onClick={uploadToServer}
                                                        >upload</Button>
                                                    </Box> : null
                                                }
                                            </Box>
                                            : <Button
                                                sx={{my: 2}}
                                                variant="contained"
                                                component="label"
                                            >
                                                Upload File
                                                <input type="file" hidden accept="image/*" onChange={uploadToClient}/>
                                            </Button>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </Paper>
                <Paper sx={{p: 2, mb: 4}} elevation={2}>
                    <Typography>
                        Recipe ingredients
                    </Typography>

                    <Grid container spacing={1}>
                        {
                            ingredients.map((ingredient) => {
                                return <IngredientForm ingredient={ingredient} updateIngredient={updateIngredient}
                                                       key={ingredient.key} itemKey={ingredient.key}/>
                            })
                        }
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
                            <ButtonGroup>
                                {
                                    key === 0 ?
                                        <Button variant={"contained"} disabled={true}>Remove</Button>
                                        :
                                        <Button variant={"contained"} onClick={() => removeIngredient()}>Remove</Button>
                                }
                                <Button variant={"contained"} onClick={() => addIngredient()}>Add</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>

                </Paper>
            </form>

        </Container>
    </>

}

export default withPageAuthRequired(RecipeCreate)
