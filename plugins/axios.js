import { userStore } from '~/store/user';
export default ({ $axios }) => {
    $axios.defaults.baseURL = 'https://media.evercam.io/v2';
    const user = userStore()
    if (process.client) {
        const storedToken = localStorage.getItem('evercam_token');
        if (storedToken) {
            user.initToken(storedToken);
            $axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
        else {
            console.error('no token fround');
        }
    }
    
}