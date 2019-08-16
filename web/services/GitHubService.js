import github_axios from './github_axios'

export const githubService = {
  getAssignees,
  getIssues,
  getRepository
}

function getAssignees(repo_name) {
  return github_axios.get('/repos/' + repo_name + '/assignees')
}

function getRepository(repo_name) {
  return github_axios.get('/repos/' + repo_name)
}

function getIssues(repo_name, timer) {
  // for one month issue
  let currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() - 1)

  let dateStr = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth()+1)).slice(-2)  + '-' + ('0' + currentDate.getDate()).slice(-2)
  let url = '/search/issues?q=repo:' + repo_name + '+state:closed+type:issue'
  if (timer == 'one_month') {
    url += '+closed:>=' + dateStr
  } else {
    url += '+closed:<' + dateStr
  }
  // show only close issue
  return github_axios.get(url)
}
