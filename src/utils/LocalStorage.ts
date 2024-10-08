class LocalStorage {
	private static instance: LocalStorage;

	private constructor() { }

	static getInstance(): LocalStorage {
		if (!LocalStorage.instance) {
			LocalStorage.instance = new LocalStorage();
		}
		return LocalStorage.instance;
	}

	setItem(key: string, value: unknown): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	getItem<T>(key: string): T | null {
		const item = localStorage.getItem(key);
		if (item) {
			return JSON.parse(item) as T;
		}
		return '' as T;
	}

	removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	clear(): void {
		localStorage.clear();
	}

	exists(key: string): boolean {
		return localStorage.getItem(key) !== null;
	}
}

export default LocalStorage;
