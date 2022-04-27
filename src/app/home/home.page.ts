import { Component } from '@angular/core';
import { EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  hasAccount = false;
  currentImage = null;
  imageData = null;

  constructor(private emailComposer: EmailComposer) {}

  async checkAccount() {
    this.hasAccount = await this.emailComposer.hasAccount();
  }

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos, or Prompt
    });

    this.imageData = image.base64String;
    this.currentImage = `data:image/jpeg;base64,${image.base64String}`;
  }

  async openEmail() {
    const email: EmailComposerOptions = {
      to: '',
      cc: '',
      attachments: [`base64:image.jpg//${this.imageData}`],
      subject: 'my cool image',
      body: 'yo whats going on guys',
    };

    await this.emailComposer.open(email);
  }
}
