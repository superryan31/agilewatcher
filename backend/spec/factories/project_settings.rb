FactoryBot.define do
  factory :project_setting do
    github_token { "MyString" }
    github_repository { "MyString" }
    project_start_date { "2019-08-08" }
    user { nil }
  end
end
