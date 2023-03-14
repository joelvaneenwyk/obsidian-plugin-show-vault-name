import { Plugin } from "obsidian";

export default class MyPlugin extends Plugin {
	statusBarVaultName: HTMLElement;

	async onload() {
		const vaultName = this.app.vault.getName();
		// Create your custom status bar item and set its contents
		setTimeout(() => {
			this.statusBarVaultName = this.addStatusBarItem();
			this.statusBarVaultName
				.createEl("big")
				.createEl("strong", { text: "| " + vaultName });
		}, 50); // insure always last position
	}
}
