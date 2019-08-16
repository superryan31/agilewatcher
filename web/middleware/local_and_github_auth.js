export default function({ store, redirect}) {
  if (!store.getters.isLoggedIn) {
    return redirect('/login')
  }
  else if(!store.getters.isExistGitHubToken){
    return redirect('/setting')
  }
}
