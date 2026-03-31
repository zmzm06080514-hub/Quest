import type { FormDataInterface } from './types.js';
import { DataProcessor } from './DataProcessor.js';

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
      console.debug('Firestore 저장 시도', apiData);
      const response = await this.sendToFirestore(apiData);
      console.debug('Firestore 저장 성공', response);

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
      throw new Error('Firebase Firestore가 초기화되지 않았습니다.');
    }

    // Firestore 문서 ID는 랜덤(자동 생성)으로 둡니다.
    // (중복 신청해도 새로운 문서로 추가됩니다.)
    const doc = await firestore.collection('applications').add({
      ...data,
      createdAt: new Date().toISOString(),
    });

    return {
      id: doc.id,
      ...data,
    };
  }

  public getMinSubmitInterval(): number {
    return 2000;
  }
}
