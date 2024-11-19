export function isValidPhoneNumber(phoneNumber: string): boolean {
	const cleanNumber = phoneNumber.replace(/\D/g, '')

	const americanPhoneRegex = /^1?([2-9]\d{2}[2-9]\d{6})$/

	return (
		(cleanNumber.length === 10 ||
			(cleanNumber.length === 11 && cleanNumber.startsWith('1'))) &&
		americanPhoneRegex.test(cleanNumber)
	)
}

export function formatPhoneNumber(phoneNumber: string): string {
	if (!isValidPhoneNumber(phoneNumber)) {
		throw new Error('Invalid phone number format')
	}

	const cleanNumber = phoneNumber.replace(/\D/g, '')

	const normalizedNumber = cleanNumber.slice(-10)

	return `+1(${normalizedNumber.slice(0, 3)})${normalizedNumber.slice(
		3,
		6
	)}-${normalizedNumber.slice(6)}`
}
