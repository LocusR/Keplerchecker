export class PhoneUtils {
	private static readonly PHONE_REGEX = /\+1\(\d{3}\)\d{3}-\d{4}/g

	public static cleanPhoneNumber(phone: string): string {
		return phone.replace(/[\(\)\-\+\s]/g, '')
	}

	public static extractPhoneNumber(text: string): string | null {
		const matches = text.match(this.PHONE_REGEX)
		if (!matches || matches.length === 0) {
			return null
		}
		return this.cleanPhoneNumber(matches[0])
	}

	public static isValidPhoneNumber(phone: string): boolean {
		return /^1\d{10}$/.test(phone)
	}

	public static formatPhoneNumber(phone: string): string {
		const cleaned = this.cleanPhoneNumber(phone)
		return `+1(${cleaned.slice(1, 4)})${cleaned.slice(4, 7)}-${cleaned.slice(
			7
		)}`
	}
}
