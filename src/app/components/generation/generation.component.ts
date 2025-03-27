import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generation',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
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

  clear() {
    this.userInput = '';
  }

  fetchImage() {
    const index = this.satisfied.findIndex(msg => msg.text === "Hope to reach your expectations.....🤩");

    if (index !== -1) {
      this.satisfied.splice(index, 1);
    }

    // Push the user message
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

    const apiUrl = 'https://529c-156-210-149-186.ngrok-free.app/home/tryer';

    this.homeService.generation(apiUrl, this.userInput).subscribe({
      next: (res) => {
        const index = this.messages.findIndex(msg => msg.loading);
        if (index !== -1) {
          this.messages.splice(index, 1);
        }

        if (res.url) {
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(res.url);
          this.messages.push({
            text: "Here's your generated UI:",
            imageUrl: this.imageUrl,
            isUser: false,
          });
          this.regenirate();
        } else {
          this.messages.push({
            text: 'Failed to generate the UI😔. Invalid response from the server❌.',
            imageUrl: "../../images/Error13.png",
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
          imageUrl: "../../images/Not-Found12.png",
          isUser: false,
        });
        this.clear();
      },
    });
  }

}
