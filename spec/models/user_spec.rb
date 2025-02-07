require 'rails_helper'

RSpec.describe User, type: :model do
  describe '.create' do
    context 'when successful' do
      it 'sets a confirmation token' do
        user = User.create(
          email: 'new@user.com',
          password: 'password',
          password_confirmation: 'password'
        )

        expect(user).to be_persisted
        expect(user.confirmation_token.length).to eq(20)
      end
    end
   end

    context 'when unsuccessful' do
      it 'does not set a confirmation token' do
        user = User.create(
          email: 'new@user.com',
          password: 'password',
          password_confirmation: 'p'
        )

        expect(user).not_to be_persisted
        expect(user.confirmation_token).to be_nil
      end
    end
  end
end
