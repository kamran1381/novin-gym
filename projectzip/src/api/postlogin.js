
import axiosapi from "@/app/lib/axios";

export const postlogin = async (formData) => {
    try {
        const response = await axiosapi.post('/login', formData);
        if (response.status === 200) {
           
            return response.data.user;
            
        } else {
            console.log('User info not posted');
        }
    } catch (error) {
        console.error("Login error:", error); // Log any login errors
    }
};
