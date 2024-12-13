import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../providers/ReduxProvider';
import { supabase } from '../utils';
import { setUser } from '../state/globalSlice';

const Appbar = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.global.user);
    const dispatch = useAppDispatch();

    const signOutUser = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            dispatch(setUser(null));
            navigate("/");
        }
    };

    if (user) {
        return (
            <div className="flex justify-between items-center px-4 py-2 bg-gray text-black z-50">
                <div 
                    className="cursor-pointer text-lg font-semibold"
                    onClick={() => navigate("/")}
                >
                    <h1>Social Media Feed</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        className="px-4 py-2 bg-red hover:bg-red text-black font-medium rounded transition duration-200"
                        onClick={signOutUser}
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex justify-between items-center px-4 py-2 bg-gray text-black z-50">
                <div 
                    className="pl-2 cursor-pointer text-lg font-semibold"
                    onClick={() => navigate("/")}
                >
                    <h1>Social Media Feed</h1>
                </div>

                <div className="flex items-center space-x-4 pr-2">
                    <button
                        className="px-4 py-2 bg-blue hover:bg-blue text-black font-medium rounded transition duration-200"
                        onClick={() => navigate("/signup")}
                    >
                        Signup
                    </button>
                    <button
                        className="px-4 py-2 bg-green hover:bg-green text-black font-medium rounded transition duration-200"
                        onClick={() => navigate("/")}
                    >
                        Signin
                    </button>
                </div>
            </div>
        );
    }
};

export default Appbar;
