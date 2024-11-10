export class PhoneUtil {
	static parsePhoneNumber(text: string): string | null {
		const phoneRegex = /\+1\d{9}/
		const match = text.match(phoneRegex)
		return match ? match[0] : null
	}

	static validatePhoneNumber(phone: string): boolean {
		return /^\+380\d{9}$/.test(phone)
	}
}
