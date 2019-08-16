class IssuesController < ActionController::Base
  # before_action :authenticate_user!, except: :show
  respond_to :json
  def index
    client = Octokit::Client.new(:access_token => params[:github_token])
    issues = client.issues params[:github_repository]
    render :json => issues
  end
end