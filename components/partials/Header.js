import {useUser} from "@auth0/nextjs-auth0";
import Link from 'next/link';
import {AddCircle, AddCircleOutline, Fastfood, PlusOne} from "@mui/icons-material";
import {AppBar, Avatar, Button, Container, styled, Toolbar, Typography} from "@mui/material";

const Header = () => {

  const {user, isLoading, error} = useUser()

  const Brand = styled(Typography)`
    display: flex;
    align-items: center;
    flex-grow: 1;
  `

  const authLinks = (user) => {

    if (user) {
      return <>
          <Link href={"/recipes/actions/create"}><Button color="inherit"><AddCircle/></Button></Link>
          <Link href={"/api/auth/logout"}><Button color="inherit"><Avatar alt={user.name} src={user.picture} /></Button></Link>

        </>

    }

    return <Link href={"/api/auth/login"} color={"inherit"}><Button color="inherit">Login</Button></Link>

  }

  return <header>
    <AppBar position={"static"} elevation={2} color={"primary"}>
      <Container maxWidth={"xl"}>
        <Toolbar disableGutters>
          <Brand>
            <Fastfood /> FoodFactory
          </Brand>

          {authLinks(user)}

        </Toolbar>
      </Container>
    </AppBar>
  </header>

}

export default Header