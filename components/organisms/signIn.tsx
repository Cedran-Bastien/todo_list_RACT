'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authData } from '@/type';
import { useRouter } from 'next/navigation'
import TextField from '@mui/material/TextField';
import { useAuth } from '@/hooks/useAuth';

export const SignIn = () => {
  const router = useRouter()

  const { signIn } = useAuth()

  // Form variable
  const { reset, register, handleSubmit, formState: { errors } } = useForm<authData>({
      defaultValues: {
         email: '',
         password: ''
      }
  });

  const onSubmit : SubmitHandler<any> = (data) => {
    // TODO 
    
    signIn(data.email, data.password)
      .then((data) => {
        console.log(data)
      })
    
    //router.push('/dashboard')
    
    // reset({
    //   email: '',
    //   password: ''
    // })
  }
   

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    type='email'
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    error= {!!errors.email}
                    helperText={errors.email?.message}
                    {...register('email', {
                      required: 'Email is required',
                      validate: {
                        valid: v => new RegExp(/^.*@.*\..*$/g).test(v) || 'Not a valid email'
                      } 
                    })}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={!!errors.password}
                    helperText= {errors.password?.message}
                    {...register('password', {
                      required: 'Password is required',
                    })}
                />
                    {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    /> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            <Grid container>
              <Grid item xs>
              <Link href="#">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/sign-up">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}