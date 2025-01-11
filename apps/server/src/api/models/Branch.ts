export class Branch {
		constructor(
				private name: string,
				private id?: number
		) { }

		get toJson(): object {
				return {
						name: this.name,
						id: this.id
				}
		}
}