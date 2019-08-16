Rails.application.routes.draw do
  resources :issues, only: [:index, :show] , defaults: { format: :json }
  devise_for :users, defaults: { format: :json }
  resources :project_setting
  get '/user-project-setting' => 'project_setting#user_project_setting'
end
