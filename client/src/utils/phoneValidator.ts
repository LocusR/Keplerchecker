export function isValidPhoneNumber(phoneNumber: string): boolean {
	const cleanNumber = phoneNumber.replace(/\D/g, '')

	const americanPhoneRegex = /^[2-9]\d{2}[2-9]\d{6}$/

	return cleanNumber.length === 10 && americanPhoneRegex.test(cleanNumber)
}

export function formatPhoneNumber(phoneNumber: string): string {
	const cleanNumber = phoneNumber.replace(/\D/g, '')

	if (cleanNumber.length === 10) {
		return `+1(${cleanNumber.slice(0, 3)})${cleanNumber.slice(
			3,
			6
		)}-${cleanNumber.slice(6)}`
	}

	throw new Error('Invalid phone number format')
}
