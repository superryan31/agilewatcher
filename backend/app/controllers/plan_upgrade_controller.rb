class PlanUpgradeController < ApplicationController
  respond_to :json

  def change_plan
    user = User.find_by(id: current_user.id)
    flag = current_user.used_free == true ? false : true
    user.update_column(:used_free, flag)
    render :json => user
  end
end