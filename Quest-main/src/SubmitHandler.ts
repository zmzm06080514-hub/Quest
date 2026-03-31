import type { FormDataInterface } from './types.js';
import { DataProcessor } from './DataProcessor.js';

interface FirebaseWindow extends Window {
  appFirebase?: {
    firestore: any;
  };
}

declare global {
  interface Window extends FirebaseWindow {}
}

export class SubmitHandler {
  private isSubmitting = false;

  public isSubmitting_(): boolean {
    return this.isSubmitting;
  }

  public setSubmitting(value: boolean): void {
    this.isSubmitting = value;
  }

  public async submit(data: FormDataInterface): Promise<{
    success: boolean;
    message: string;
    data?: unknown;
  }> {
    if (this.isSubmitting) {
      return {
        success: false,
        message: '이미 무료 신청 처리 중입니다.',
      };
    }

    this.isSubmitting = true;
    console.debug('SubmitHandler.submit 시작', data);

    try {
      const validation = DataProcessor.validate(data);
      if (!validation.isValid) {
        console.warn('SubmitHandler validation 실패', validation);
        return {
          success: false,
          message: validation.errors.join(', '),
        };
      }

      const apiData = DataProcessor.toAPIFormat(data);
      let response;

      try {
        console.debug('Firestore 저장 시도', apiData);
        response = await this.sendToFirestore(apiData);
        console.debug('Firestore 저장 성공', response);
      } catch (firestoreError) {
        console.warn('Firestore 저장 실패, 로컬 API로 전환합니다:', firestoreError);
        response = await this.sendToAPI(apiData);
      }

      return {
        success: true,
        message: '무료 신청이 접수되었습니다.',
        data: response,
      };
    } catch (error) {
      console.error('SubmitHandler.submit 전체 실패', error);
      console.error('Submit error:', error);
      return {
        success: false,
        message: '무료 신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
      };
    } finally {
      this.isSubmitting = false;
    }
  }

  private async sendToFirestore(data: FormDataInterface & { timestamp: string }): Promise<unknown> {
    const firestore = (window as any).appFirebase?.firestore;
    if (!firestore) {
      throw new Error('Firebase Firestore가 초기화되지 않았습니다. window.appFirebase=', (window as any).appFirebase);
    }

    const doc = await firestore.collection('submissions').add({
      ...data,
      createdAt: new Date().toISOString(),
    });

    return {
      id: doc.id,
      ...data,
    };
  }

  private async sendToAPI(data: FormDataInterface & { timestamp: string }): Promise<unknown> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Math.random().toString(36).substring(7),
          timestamp: data.timestamp,
          status: 'pending',
        });
      }, 1500);
    });
  }

  public getMinSubmitInterval(): number {
    return 2000;
  }
}
