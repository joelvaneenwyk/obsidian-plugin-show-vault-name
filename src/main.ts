import { Plugin } from "obsidian";

export default class MyPlugin extends Plugin {
	statusBarVaultName: HTMLElement;

	async onload() {
		const vaultName = this.app.vault.getName();
		this.statusBarVaultName = this.addStatusBarItem();
		this.statusBarVaultName.createEl("strong", { text: vaultName });
		// this.statusBarVaultName.setText(vaultName);
	}
	onunload() {
		// this.statusBarVaultName.setText("");
		this.statusBarVaultName.remove;
	}
}
