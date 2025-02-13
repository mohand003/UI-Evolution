import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="about-page">
  <section class="hero-section text-center py-5 bg-light bg-body-secondary">
    <div class="container">
      <h1 class="display-4 fw-bold">About Us</h1>
      <h5 class="lead">Learn more about our mission, vision, and the team behind UI Evolution.</h5>
      <p class="text-muted">The UI Evolution Project automates UI creation, using algorithms to generate functional and visually appealing components based on user input. It streamlines design by reducing manual effort, accelerating prototyping, and ensuring consistency across platforms, enabling faster development with customizable templates and dynamic theming.</p>
    </div>
  </section>

  <section class="mission-section py-5">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <h2 class="fw-bold mb-4">Our Mission</h2>
          <p class="text-muted">
            At UI Evolution, our mission is to empower developers and designers to create stunning user interfaces
            effortlessly. We believe in simplifying the design process while maintaining the highest standards of
            quality and creativity.
          </p>
        </div>
        <div class="col-md-6 width: 400px; height: 300px;">
          <img src="../../assets/Mission.jpg" alt="Mission Image" class="img-fluid rounded">
        </div>
      </div>
    </div>
  </section>

  <section class="vision-section py-5 bg-body-secondary">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 width: 400px; height: 300px;">
          <img src="../../assets/Vision.jpg" alt="Vision Image" class="img-fluid rounded">
        </div>
        <div class="col-md-6">
          <h2 class="fw-bold mb-4">Our vision</h2>
          <p class="text-muted">
            At UI Evolution, our vision is to reach 50% of Front-end developers and Designers at the Middle-East and become a leading tool at the field of user-interface generation.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="team-section py-5 bg-light">
    <div class="container">
      <h2 class="text-center fw-bold mb-5">Meet Our Team</h2>
      <div class="row">
      <div class="col-md-4 text-center mb-4">
          <img src="../../assets/Mohanad.jpg" alt="Team Member" class="img-fluid rounded-circle mb-3">
          <h4 class="fw-bold">Mohanad Mohammed</h4>
          <p class="text-muted">Front-End Developer</p>
          <p class="text-muted">Team Leader</p>
      </div>
      <div class="col-md-4 text-center mb-4">
          <img src="../../assets/Omar.jpg" alt="Team Member" class="img-fluid rounded-circle mb-3">
          <h4 class="fw-bold">Omar Mohammed</h4>
          <p class="text-muted">AI Developer</p>
      </div>
      <div class="col-md-4 text-center mb-4">
          <img src="../../assets/Mahmoud.jpg" alt="Team Member" class="img-fluid rounded-circle mb-3">
          <h4 class="fw-bold">Mahmoud Basel</h4>
          <p class="text-muted">Back-End Developer</p>
      </div>
      <div class="col-md-4 text-center mb-4">
          <img src="../../assets/Ahmed.jpg" alt="Team Member" class="img-fluid rounded-circle mb-3">
          <h4 class="fw-bold">Ahmed Salah</h4>
          <p class="text-muted">Flutter Developer</p>
      </div>
      <div class="col-md-4 text-center mb-4">
          <img src="../../assets/Khaled.jpg" alt="Team Member" class="img-fluid rounded-circle mb-3">
          <h4 class="fw-bold">Khaled Abdel Nasser</h4>
          <p class="text-muted">AI Developer</p>
      </div>
      </div>
    </div>
  </section>

  <section class="cta-section text-center py-5 bg-primary text-white">
    <div class="container">
      <h2 class="fw-bold mb-4">Ready to Get Started?</h2>
      <p class="lead mb-4">Join developers and designers and enjoy using UI Evolution to create amazing interfaces.</p>
      <a routerLink="/sign-up" class="btn btn-light btn-lg">Sign Up Now</a>
    </div>
  </section>
</div>
  `,
  styles: [`
  .container img{
    width: 250px;
    height: 250px;
}
  .mission-section img{
    width: 400px;
    height: 330px;
    margin-left: 150px;
}

  .vision-section img{
    width: 400px;
    height: 330px;
}

  .about-page {
  font-family: Arial, sans-serif;
}

.hero-section {
  background-color: #f8f9fa;
}

.mission-section {
  background-color: #fff;
}

.vision-section {
  background-color: #f8f9fa;
}

.team-section {
  background-color: white;
}

.cta-section {
  background-color: #3b82f6;
}

.cta-section .btn-light {
  color: #3b82f6;
  font-weight: 500;
}
    `]
})
export class AboutComponent {}