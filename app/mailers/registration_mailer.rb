class RegistrationMailer < ApplicationMailer
  def confirm_email(user)
    @user = user
    mail subject: "Confirm your email", to: user.email
  end
end