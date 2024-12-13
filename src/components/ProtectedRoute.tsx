import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../providers/ReduxProvider";
import { supabase } from "../utils";
import { setUser } from "../state/globalSlice";

export default function ProtectedRoute({children}: { children: JSX.Element }) {
    const user = useAppSelector((state) => state.global.user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    useEffect(() => {
        const validate = async () => {
            const { data, error } = await supabase.auth.getSession();
            
            if(error) {
                
                
                navigate('/', { replace: true })
            } else {
                dispatch(setUser({ id: data?.session?.user.id ?? '' }))
            }
        }
        if(!user) {
            validate()
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return children;
}