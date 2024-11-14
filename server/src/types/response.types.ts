export interface ApiResponse<T = any> {
	success: boolean
	message: string
	data?: T
	error?: string
}

export interface PhoneNumberResponse {
	message: string
	phoneNumber?: string
}
