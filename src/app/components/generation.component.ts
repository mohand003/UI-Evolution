import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-generation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  template: `
  <div class="generator-container">
  <div class="generator-header">
    <h2>UI Evolution</h2>
    <p>Describe the image you want, and we'll generate it for you!</p>
  </div>

  <div class="generator-output" id="generator-output">
  <div class="message bot">
        <p>Hi!
          How can i help you today?</p>
      </div>
    <!-- Display all messages -->
    <div *ngFor="let message of messages" class="message" [ngClass]="{'user': message.isUser, 'bot': !message.isUser}">
      <p>{{ message.text }}</p>
      <!-- Display image if it exists -->
      <img *ngIf="message.imageUrl" [src]="message.imageUrl" alt="Generated Image" class="generated-image">
    </div>
  </div>

  <form class="generator-input">
    <input type="text" id="generator-input" placeholder="Describe the image you want..." [(ngModel)]="userInput" name="userInput">
    <button type="button" (click)="fetchImage()">Generate</button>
  </form>
</div>
  `,
  styles: [`
  body {
      background-color: #f8f9fa;
      font-family: Arial, sans-serif;
    }
    .generator-container {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.generator-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.generator-header h2 {
  font-weight: 700;
  color: #3b82f6;
}

.generator-output {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
}

.message {
  margin-bottom: 1rem;
}

.message.user {
  text-align: right;
}

.message.bot {
  text-align: left;
}

.message p {
  display: inline-block;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  max-width: 70%;
}

.message.user p {
  background-color: #3b82f6;
  color: white;
}

.message.bot p {
  background-color: #e9ecef;
  color: #333;
}

.generated-image {
  max-width: 100%;
  border-radius: 8px;
  margin-top: 1rem;
}

.generator-input {
  display: flex;
  gap: 0.5rem;
}

.generator-input input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.generator-input button {
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  border: none;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.generator-input button:hover {
  background-color: #2563eb;
}
    `],
})
export class GenerationComponent {

  userInput: string = '';
  imageUrl: SafeUrl | null = null;
  messages: { text: string; isUser: boolean; imageUrl?: SafeUrl }[] = [];

  constructor(private homeService: HomeService, private sanitizer: DomSanitizer) { }

  fetchImage() {
    if (!this.userInput.trim()) return;

    // Add user message to chat
    this.messages.push({ text: this.userInput, isUser: true });

    // Fetch image from API
    const apiUrl = 'http://127.0.0.1:3000/home/chat';
    this.homeService.generation(apiUrl).subscribe(
      (blob) => {
        const objectUrl = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);

        // Add bot message with the generated image
        this.messages.push({ text: 'Here\'s your generated image:', isUser: false, imageUrl: this.imageUrl });

        // Clear input
        this.userInput = '';
      },
      (error) => {
        console.error('Error fetching image:', error);
        this.messages.push({ text: 'Failed to generate the image. Please try again.', isUser: false });
        this.userInput = '';
      }
    );
  }
}