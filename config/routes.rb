Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # 
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # 
  root "spa#index"

  # Defining these route to take advantage of url helpers in the mailers
  # 
  get "/confirm/:token", to: "spa#index", as: :confirm_email, param: :token

  # Catch-all route for React Router
  # 
  get "*path", to: "spa#index", constraints: ->(req) { req.format.html? }


  # API routes
  # 
  constraints subdomain: "api" do
    use_doorkeeper scope: "v1/oauth" do
      skip_controllers :applications, :authorized_applications, :authorizations
    end

    scope module: "api" do
      namespace :v1 do
        resources :users, only: %i[create]
        resources :passwords, param: :token, only: %i[create update]
        resources :projects, only: %i[index show create update destroy]
      end
    end
  end
end
