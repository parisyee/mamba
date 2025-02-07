require 'rails_helper'

RSpec.describe "/v1/users", type: :request do
  describe "POST /v1/users" do
    describe "success" do
      it "creates a user" do
        expect do
          post v1_users_url, params: {
            user: {
              email: 'new@user.com',
              password: 'password',
              password_confirmation: 'password'
            }
          }
        end.to change(User, :count).by(1)

        expect(response).to have_http_status(201)
        expect(JSON.parse(response.body).symbolize_keys).to match(
          hash_including(
            id: User.last.id,
            email: "new@user.com"
          )
        )
      end

      it "sends a 'confirm email' email" do
        user_double = double(
          persisted?: true,
          confirmation_token: "token",
          save: true
        )
        allow(User).to receive(:new).and_return(user_double)

        mailer_double = double(deliver_later: true)
        allow(RegistrationMailer).to receive(:confirm_email)
          .and_return(mailer_double)

        post v1_users_url, params: {
          user: {
            email: "new@user.com",
            password: "password",
            password_confirmation: "password"
          }
        }

        expect(RegistrationMailer).to have_received(:confirm_email)
          .with(user_double)
        expect(mailer_double).to have_received(:deliver_later)
      end
    end

    describe "failure" do
      it "does not create a user" do
        expect do
          post v1_users_url, params: {
            user: {
              email: 'new@user.com',
              password: 'password'
            }
          }
        end.not_to change(User, :count)

        expect(response).to have_http_status(422)
        expect(JSON.parse(response.body)["error"]).to eq("Missing user params")
      end

      it "does not send a 'confirm email' email" do
        user_double = double(save: false, errors: { email: ["has already been taken"] })
        allow(User).to receive(:new).and_return(user_double)
        allow(RegistrationMailer).to receive(:confirm_email)

        post v1_users_url, params: {
          user: {
            email: "existing@user.com",
            password: "password",
            password_confirmation: "password"
          }
        }

        expect(RegistrationMailer).not_to have_received(:confirm_email)
        expect(response).to have_http_status(422)
        expect(JSON.parse(response.body)["errors"]).to eq(
          "email" => ["has already been taken"]
        )
      end
    end
  end
end
