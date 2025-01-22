import { userStore } from '~/store/user';

export default ({ $axios }) => {
    $axios.defaults.baseURL = 'https://media.evercam.io/v2';
    const user = userStore()
    const Token = user.token || localStorage.getItem('evercam_token');
    if (Token) {
        user.initToken(Token);
        $axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`;
    }
    else {
        console.error('axios error : no token fround');
    }


}