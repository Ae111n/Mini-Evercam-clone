import { userStore } from '~/store/user';

export default ({ $axios }) => {
    $axios.defaults.baseURL = 'https://media.evercam.io/v2';
    const user = userStore()
    const Token = user.token || localStorage.getItem('evercam_token');
    if (Token) {
        user.initToken(Token);
        $axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`;

        console.log('Token from store:', user.token);
        console.log('Token from localStorage:', localStorage.getItem('evercam_token'));
        console.log('Final Token:', Token);
    }
    else {
        console.error('no token fround');
    }


}