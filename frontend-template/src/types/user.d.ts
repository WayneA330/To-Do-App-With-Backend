export interface User {
	member: boolean
	id: number
	name: string
	common_name: string
	email: string
	role: string
	sector: number
	department: number
	sector_name: string
	department_name: string
	is_reporting_line: boolean
	reporting_line1: number
	reporting_line2: number
	gender: string
	myStaff: MyStaff[]
	sector_code: string
	company: number
	team: number
}

export interface MyStaff {
	employee_id: number
}
