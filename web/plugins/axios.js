export default function({$axios, store, redirect}, context){
  $axios.defaults.baseURL = process.env.baseUrl;
  $axios.onRequest( config => {
    // added authorization header to subsequence http requests
    if (store.state.token) {
      config.headers.common['Authorization'] = `${store.state.token}`
    }
  })

  $axios.onError(error => {
    if(error.response.status == 401){
      store.dispatch('logout')
        .then(() => {
          return redirect('/login')
        })
    }
  })
}
