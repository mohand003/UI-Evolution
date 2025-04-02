import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generation.component.html',
  styleUrl: './generation.component.scss'
})
export class GenerationComponent {
  userInput: string = '';
  imageUrl: SafeUrl | null = null;
  messages: {
    text: string;
    imageUrl?: SafeUrl;
    isUser: boolean;
    loading?: boolean;
  }[] = [];

  satisfied: {
    text: string;
    imageUrl?: SafeUrl;
    isUser: boolean;
    buttons?: {
      text: string;
      class: string;
      style?: { [key: string]: string };
      action: () => void;
    }[];
  }[] = [];

  constructor(private homeService: HomeService, private sanitizer: DomSanitizer) { }

  regenirate() {
    this.satisfied = this.satisfied.filter(msg => msg.text !== "Are you satisfied with the result? 😊");

    this.satisfied.push({
      text: "Are you satisfied with the result? 😊",
      isUser: false,
      buttons: [
        {
          text: "Satisfied😁",
          class: "btn btn-outline-success",
          style: { "margin-right": "15px", "padding-left": "18px", "padding-right": "18px" },
          action: () => this.finish()
        },
        {
          text: "Not Satisfied😔",
          class: "btn btn-outline-danger",
          style: { "padding-left": "18px", "padding-right": "18px" },
          action: () => this.fetchImage()
        }
      ]
    });
  }

  finish() {
    if (this.satisfied.length > 0) {
      this.satisfied.pop();
    }

    this.satisfied.push({
      text: "Hope to reach your expectations.....🤩",
      isUser: false,
    });

    this.userInput = '';
  }

  downloadImage(imageUrl: SafeUrl | undefined) {
    if (!imageUrl) return;

    const url = this.sanitizer.sanitize(4, imageUrl);

    if (!url) return;

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'generated-ui.png');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


  clear() {
    this.userInput = '';
  }

  fetchImage() {
    if (!this.userInput || this.userInput.trim() === "") {
      this.clear();
      return;
    }

    if (!this.userInput.toLowerCase().includes("ui")) {
      this.messages.push({
        text: this.userInput,
        isUser: true,
      });

      this.messages.push({
        text: `🎨🤖 UI magic only!\nWe only do UI, no AI overlords here!✨😎`,
        imageUrl: "https://res.cloudinary.com/df9rcxvpg/image/upload/v1743598997/UI%20Evolution/NotUI.png",
        isUser: false,
      });
      this.clear();
      return;
    }

    const index = this.satisfied.findIndex(msg => msg.text === "Hope to reach your expectations.....🤩");

    if (index !== -1) {
      this.satisfied.splice(index, 1);
    }

    this.messages.push({
      text: this.userInput,
      isUser: true,
    });

    const loadingMessage = {
      text: "Generating UI, please wait... ⏳",
      isUser: false,
      loading: true
    };
    this.messages.push(loadingMessage);

    const apiUrl = 'https://93b3-156-211-100-193.ngrok-free.app/home/chat';

    this.homeService.generation(apiUrl, this.userInput).subscribe({
      next: (res) => {
        const index = this.messages.findIndex(msg => msg.loading);
        if (index !== -1) {
          this.messages.splice(index, 1);
        }

        if (res.imagePath) {
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(res.imagePath);
          this.messages.push({
            text: "Here's your generated UI:",
            imageUrl: this.imageUrl,
            isUser: false,
          });
          this.regenirate();
        } else {
          this.messages.push({
            text: 'Failed to generate the UI😔. Invalid response from the server❌.',
            imageUrl: "https://res.cloudinary.com/df9rcxvpg/image/upload/v1743622917/UI%20Evolution/error-message.png",
            isUser: false,
          });
          this.clear();
        }
      },

      error: (error) => {
        const index = this.messages.findIndex(msg => msg.loading);
        if (index !== -1) {
          this.messages.splice(index, 1);
        }

        this.messages.push({
          text: 'Failed to connect to the server😔🚫. Please try again🔄️.',
          imageUrl: "https://res.cloudinary.com/df9rcxvpg/image/upload/v1743622917/UI%20Evolution/not-found.png",
          isUser: false,
        });
        this.clear();
      },
    });
  }


}
