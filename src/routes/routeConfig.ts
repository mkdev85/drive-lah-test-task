import { RouteConfig } from "./types";

export const routeConfig: RouteConfig[] = [
	{
		path: '/location',
		name: 'Location'
	},
	{
		path: '/about',
		name: 'About'
	},
	{
		path: '/features',
		name: 'Features'
	},
	{
		path: '/rules',
		name: 'Rules'
	},
	{
		path: '/pricing',
		name: 'Pricing'
	},
	{
		path: '/promotion',
		name: 'Promotion'
	},
	{
		path: '/pictures',
		name: 'Pictures'
	},
	{
		path: '/insurance',
		name: 'Insurance'
	},
	{
		path: '/subscription',
		name: 'Subscription'
	},
	{
		path: '/device',
		name: 'Device'
	},
	{
		path: '/early-access',
		name: 'Early Access'
	},
	{
		path: '*',
		name: 'Not Found'
	},
]