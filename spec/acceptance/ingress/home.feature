Feature: Make sure the front page behaves as expected.
  Scenario: The front page redirects to the Ingress subdomain.
     When I load the main page
     Then I am redirected to the ingress subdomain
