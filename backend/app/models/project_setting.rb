class ProjectSetting < ApplicationRecord
  belongs_to :user

  validates :github_token, :github_repository, :project_start_date, presence: true
end
