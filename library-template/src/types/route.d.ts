import * as React from 'react'

export interface Route {
	path: string[]
	Component: React.FunctionComponent
	exact: boolean
	permissions: string[]
	restrictions: string[]
	additionalProps: {}
}
