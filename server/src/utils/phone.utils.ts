export class PhoneUtils {
	private static readonly PHONE_REGEX =
		/\\?\+?1?\s*\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/

	public static isValidPhoneNumber(phoneNumber: string): boolean {
		const cleanNumber = this.cleanPhoneNumber(phoneNumber)
		return this.PHONE_REGEX.test(cleanNumber)
	}

	public static extractPhoneNumber(text: string): string | null {
		if (!text) return null

		const match = text.match(this.PHONE_REGEX)
		if (!match) return null

		return this.cleanPhoneNumber(match[0])
	}

	private static cleanPhoneNumber(phoneNumber: string): string {
		return phoneNumber
			.replace(/\\/g, '')
			.replace(/\s+/g, '')
			.replace(/[()-]/g, '')
	}
}
