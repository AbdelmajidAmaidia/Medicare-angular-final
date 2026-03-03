import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message { role: 'user' | 'ai'; text: string; }

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.component.html',
})
export class AiChatComponent {
  messages: Message[] = [
    { role: 'ai', text: 'Hello! I am your AI health assistant. How can I help you today?' },
  ];
  userInput = '';

  sendMessage() {
    if (!this.userInput.trim()) return;
    this.messages.push({ role: 'user', text: this.userInput });
    const response = 'Thank you for your question. Based on the information provided, I recommend consulting with your doctor for a proper evaluation.';
    this.messages.push({ role: 'ai', text: response });
    this.userInput = '';
  }
}
