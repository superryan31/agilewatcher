require 'rails_helper'

RSpec.describe ProjectSetting, type: :model do
  let(:project_setting) { build(:project_setting) }

  context 'Validations' do
    it 'required github authorization token' do
      project_setting.github_token = nil
      expect(project_setting).to_not be_valid
      expect(project_setting.errors.messages[:github_token]).to be_present
    end
    it 'required github repository' do
      project_setting.github_repository = nil
      expect(project_setting).to_not be_valid
      expect(project_setting.errors.messages[:github_repository]).to be_present
    end
    it 'required project start date' do
      project_setting.project_start_date = nil
      expect(project_setting).to_not be_valid
      expect(project_setting.errors.messages[:project_start_date]).to be_present
    end
  end

  context 'Database operations' do
    #  TODO
  end
end
