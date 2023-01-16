import { Button, Flex, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface SignInData{
  email:string;
  password:string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório	'),
  password: yup.string().min(6,'Senha deve ter pelo menos 6 caracteres').required('Senha obrigatório'),
})

export default function Home() {
  const {register, handleSubmit, formState} = useForm<SignInData>({resolver: yupResolver(signInFormSchema)})
  const errors = formState.errors
    
  async function handleSignIn (data: SignInData ){
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
  }

  return (
    <Flex 
    w="100vw" 
    h="100vh" 
    alignItems="center" 
    justifyContent="center" 
    >
      <Flex 
      as="form" 
      width="100%" 
      maxWidth={360}
      bg="gray.800"
      p="8"
      borderRadius={8}
      flexDirection="column"
      onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={5} >
          
          <Input 
          type="email"
          label="E-mail"
          {...register('email')}	
          error={errors.email}
          /> 

          <Input 
          type="password"
          label="Senha"
          {...register('password')}	
          error={errors.password}
          /> 
         </Stack>

        <Button type='submit' marginTop="6" colorScheme={'pink'}> Entrar </Button>
      </Flex>
    </Flex>
  )
}
