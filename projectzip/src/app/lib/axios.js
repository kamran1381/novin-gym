import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_AXIOS_API_URL;

// axios.interceptors.request.use(
//   (config) => {
//     const session = useSession()
//     let token = session?.data?.user?.token
//     console.log(token)
//     if (session) {
//       config.headers['Content-Type'] = 'application/json'
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

const axiosapi = axios.create({
  baseURL: API_URL ,
});

export default axiosapi;