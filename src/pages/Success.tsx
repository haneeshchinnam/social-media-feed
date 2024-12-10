import React from 'react'
import { supabase } from '../utils'
import { Button } from '../components';

const Success = () => {
    const signOutUser = async () => {
        const {error} = await supabase.auth.signOut();

        // console.log("url", process.env.SUPABASE_URL);
        
    }
  return (
    <div>
        <p>Success</p>
        <Button text='Sign Out' onClick={signOutUser} />
    </div>
  )
}

export default Success