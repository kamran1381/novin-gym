'use server'
import { auth, signIn, signOut } from "./auth"



export const isLogin = () => {
    const isAuth = auth()
    return isAuth
}

// export const handleSignOut = async () => {
//     await signOut({ redirectTo: "/login", redirect: true });
// }

export const loginWithCredentials = async (username , password) => {
     if(username === 'abolfazl' && password === '12345678'){
        try {
            const response = await fetch('https://novingym.liara.run/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   username , 
                   password
                })
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                await signIn('credentials', {
                    user: JSON.stringify(data.user),
                    redirect: false,
                });
                console.log(data);
    
                return { message: 'ورود موفق', status: 200 };
            } else if (response.status === 422) {
                return { message: 'مقادیر ورودی غیر مجاز است', status: 422 };
            } else if (response.status === 401) {
                return { message: 'اطلاعات کاربر وارد شده نامعتبر است', status: 401 };
            } else {
                return { message: 'خطای نامشخص', status: 520 };
            }
    
        } catch (error) {
            return { message: 'خطای نامشخص', status: 520 };
        }
     }else{
        console.log('wrong password || username')
     }
   
}
