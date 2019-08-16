class ProjectSettingController < ApplicationController
  respond_to :json
  before_action :set_project_setting, only: [:show, :update, :destroy]

  # GET /project_setting
  def index
    @project_settings = ProjectSetting.all
    render json: @project_settings
  end

  # POST /project_setting
  def create
    @project_setting = ProjectSetting.new(project_setting_params)
    @project_setting.user_id = current_user.id
    @project_setting.save
    render json: @project_setting
  end

  # GET /project_setting/:id
  def show
    render json: @project_setting
  end

  # PUT /project_setting/:id
  def update
    @project_setting.update(project_setting_params)
    head :no_content
  end

  def user_project_setting
    project_setting = ProjectSetting.find_by(user_id: current_user.id)
    render json: project_setting
  end

  private
  def project_setting_params
    # whitelist params
    params.permit(:github_token, :github_repository, :project_start_date)
  end

  def set_project_setting
    @project_setting = ProjectSetting.find_by(id: params[:id])
  end

end
