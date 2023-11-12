import styled from "@emotion/styled";
import { Box, Button, Card, CardContent, CssBaseline, Link, TextField, Typography } from "@mui/material";
import {useRef} from 'react'
import { loginActions } from "../store/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"

export default function Login() {
    const email = useRef(); 
    const password = useRef();
    const dispatch = useDispatch();
    const {isLogged, invalidLogin} = useSelector(state => state.login); 
    function loginHandler(){
        dispatch(loginActions.login({email:email.current.value, password:password.current.value}))
    }
    const CustomTextField = styled(TextField)( ({ theme }) => ({
        width: 400
    }))

    return (
        <Card sx={{
            width: 500,
            display: 'block',   
            margin: 'auto',
            borderRadius: 3,
            marginTop: 15,
            padding: 5,

        }}>
            <CssBaseline />
            {console.log(isLogged)}
            {invalidLogin===true ? <Typography variant="h6" sx={{color:'red'}}>Invalid Credentials!</Typography>: null}
            <CardContent >
                <Typography variant="h4">Admin Login</Typography>
                <Box component="form" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 2
                    }}>
                    <CustomTextField inputRef={email} margin="normal" type="email" id="email" name="email" label="Email" required />
                    <CustomTextField inputRef={password} margin="normal" type="password" id="password" name="password" label="Password" required />
                    <Button sx={{marginTop:2}} variant="contained" onClick={loginHandler}>Login</Button>
                </Box>
                <Link sx={{float: 'right',marginTop: 2}} href="#">Forget password?</Link>
            </CardContent>
        </Card>

    )
}