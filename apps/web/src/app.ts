import { Component, output, resource, type OutputEmitterRef, type ResourceRef } from "@angular/core";
import { rxResource } from "@angular/core/rxjs-interop";
import { of } from "rxjs";

@Component({
	selector: "app-root",
	template: ""
})
export class App {
	// eslint-disable-next-line angular-immutability/prefer-immutable-resource
	users = resource({ loader: async () => [] });
	// eslint-disable-next-line angular-immutability/prefer-immutable-resource
	items = rxResource({ stream: () => of([]) });
	// eslint-disable-next-line angular-immutability/prefer-immutable-resource
	extra!: ResourceRef<unknown[]>;
	// eslint-disable-next-line angular-immutability/prefer-protected-outputs
	clicked = output();
	// eslint-disable-next-line angular-immutability/prefer-protected-outputs
	public saved = output<string>();
	// eslint-disable-next-line angular-immutability/prefer-protected-outputs
	private closed = output();
	// eslint-disable-next-line angular-immutability/prefer-protected-outputs
	events!: OutputEmitterRef<void>;

	readonly goodUsers = resource({ loader: async () => [] });
	protected goodClick = output();
	protected readonly goodEvents!: OutputEmitterRef<void>;
}
