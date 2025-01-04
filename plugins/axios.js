

export default ({$axios},inject) => {
    $axios.defaults.baseURL = 'https://media.evercam.io/v2';
    inject('axios',$axios);
}