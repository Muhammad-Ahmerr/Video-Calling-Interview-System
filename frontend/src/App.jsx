import { Show, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react'


function App() {

  return (
    <>
        <h1 className=''>Welcome to the app</h1>
        <Show when="signed-out">
          <SignInButton mode='modal' />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <SignOutButton >
            SignOut
          </SignOutButton>
        </Show>
        <UserButton/>
    </>
  )
}

export default App
