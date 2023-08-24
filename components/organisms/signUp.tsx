'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authData } from '@/type';
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth';

const onSuccess = () => {
  
}

export const SignUp = () => {
  const [password, setPassword] = React.useState('')
  const router = useRouter()
  
  const { signUp } = useAuth()

  // Form variable
  const { reset, getValues, register, handleSubmit, formState: { errors } } = useForm<authData>({
      defaultValues: {
        firstname:'',
        lastname:'',
        email: '',
        password: ''
      }
  });

  const onSubmit : SubmitHandler<any> = (data) => {
    signUp(data.email, data.password, data.firstName, data.lastName)
      .then((data) => {
        console.log(data)
      })

    // todo snackbar confirmation
    router.push('/auth/sign-in')
    
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
                autoFocus
                {...register("firstname", {
                  required: "firstname is required"
                })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                autoComplete="family-name"
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
                {...register("lastname", {
                  required: "lastname is required"
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  validate: {
                    valid: v => new RegExp(/^.*@.*\..*$/g).test(v) || 'Not a valid email'
                  } 
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password', {
                  required: "Password is required", 
                  onChange: (value) => {
                    setPassword(value)
                  },
                  minLength: {
                    value: 14,
                    message: "Password must be at least 14 characters long"
                  },
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?\/~_+-=|]).*$/,
                    message: "Password must contain at least 1 number, 1 lowercase, 1 uppercvase and 1 digit"
                  }
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password Confirmation"
                type="password"
                autoComplete="confirmation-password"
                error={!!errors.passwordConfirmation}
                helperText={errors.passwordConfirmation?.message}
                {...register('passwordConfirmation', {
                  required: "Passwordis required",
                  validate: v => {
                    console.log(password)
                    return v === getValues('password') || "password not corresponding"
                  } 
                })}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}