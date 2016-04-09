module AcceptanceSteps
  step 'I load the main page' do
    visit root_path
  end

  step 'I am redirected to the ingress subdomain' do
    expect(current_url).to have_text 'https://ingress.'
  end
end
