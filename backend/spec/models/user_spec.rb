require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }

  context 'Validations' do
    it 'required email' do
      user.email = nil
      expect(user).to_not be_valid
      expect(user.errors.messages[:email]).to be_present
    end
    it 'is invalid email' do
      user.email = 'not email'
      expect(user).to_not be_valid
      expect(user.errors.messages[:email]).to be_present
    end
    it 'required password' do
      user.password = nil
      expect(user).to_not be_valid
      expect(user.errors.messages[:password]).to be_present
    end
  end

  context 'Database operations' do
    it 'should create user' do
      user_attrs = attributes_for(:user)
      user = User.new(user_attrs)
      expect { user.save }.to change { User.all.count }.by(1)
      expect(user.email).to eq(user_attrs[:email])
    end
    it 'should update user' do
      user = create(:user)
      user_attrs = attributes_for(:user)
      user.update(user_attrs)
      user.reload
      expect(user.email).to eq(user_attrs[:email])
    end
    it 'should delete user' do
      user = create(:user)
      expect { user.destroy }.to change { User.all.count }.by(-1)
    end
  end
end
