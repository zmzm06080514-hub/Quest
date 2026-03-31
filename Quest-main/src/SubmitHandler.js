import { DataProcessor } from './DataProcessor.js';
export class SubmitHandler {
    constructor() {
        this.isSubmitting = false;
    }
    isSubmitting_() {
        return this.isSubmitting;
    }
    setSubmitting(value) {
        this.isSubmitting = value;
    }
    async submit(data) {
        if (this.isSubmitting) {
            return {
                success: false,
                message: '이미 무료 신청 처리 중입니다.',
            };
        }
        this.isSubmitting = true;
        try {
            const validation = DataProcessor.validate(data);
            if (!validation.isValid) {
                return {
                    success: false,
                    message: validation.errors.join(', '),
                };
            }
            const apiData = DataProcessor.toAPIFormat(data);
            let response;
            try {
                response = await this.sendToFirestore(apiData);
            }
            catch (firestoreError) {
                console.warn('Firestore 저장 실패, 로컬 API로 전환합니다:', firestoreError);
                response = await this.sendToAPI(apiData);
            }
            return {
                success: true,
                message: '무료 신청이 접수되었습니다.',
                data: response,
            };
        }
        catch (error) {
            console.error('Submit error:', error);
            return {
                success: false,
                message: '무료 신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
            };
        }
        finally {
            this.isSubmitting = false;
        }
    }
    async sendToFirestore(data) {
        const firestore = window.appFirebase?.firestore;
        if (!firestore) {
            throw new Error('Firebase Firestore가 초기화되지 않았습니다.');
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

    async sendToAPI(data) {
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
    getMinSubmitInterval() {
        return 2000;
    }
}
//# sourceMappingURL=SubmitHandler.js.map