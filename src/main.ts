import { Plugin } from "obsidian";

export default class MyPlugin extends Plugin {
	statusBarVaultName: HTMLElement;

	async onload() {
		const vaultName = this.app.vault.getName();
		this.statusBarVaultName = this.addStatusBarItem();
		this.statusBarVaultName
			.createEl("big")
			.createEl("strong", { text: vaultName });
	}
}
