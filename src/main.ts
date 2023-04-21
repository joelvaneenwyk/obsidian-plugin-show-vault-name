import { App, Plugin, PluginSettingTab, Setting, View } from "obsidian";

interface SBVNSettings {
	reducedAtStart: boolean;
}

const DEFAULT_SETTINGS: SBVNSettings = {
	reducedAtStart: false,
};

export default class StatusBarVaultName extends Plugin {
	settings: SBVNSettings
	title: HTMLDivElement

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new Settings(this.app, this));
		const { workspace } = this.app;
		const vaultName = this.app.vault.getName();
		const statusBar = document.querySelector('div .status-bar')
		this.title = document.createElement('div');
		this.settings.reducedAtStart ? this.title.innerHTML = "::" : this.title.innerHTML = vaultName
		this.title.classList.add("status-bar-vault-name");
		this.title.style.fontSize = "110%";
		this.title.style.fontWeight = "bold";
		statusBar?.prepend(this.title)

		this.title.addEventListener('click', () => {
			if (this.title.innerHTML === vaultName) {
				this.title.innerHTML = "::";
			} else {
				this.title.innerHTML = vaultName;
			}
		});

		// this.saveSettings();

	}

	onunload() {
		const statusBar = document.querySelector('div .status-bar')
		statusBar?.removeChild(this.title);

	}
	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}



}

class Settings extends PluginSettingTab {
	plugin: StatusBarVaultName;

	constructor(app: App, plugin: StatusBarVaultName) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Vaut Name in Status Bar' });
		containerEl.createEl('p', { text: 'Click on the vault name or on :: to reduce or enlarge' });

		new Setting(containerEl)
			.setName("Reduced at Start")
			.setDesc("Will be reduced by default")
			.addToggle((toggle) => {
				toggle
					.setValue(this.plugin.settings.reducedAtStart)
					.onChange((value) => {
						this.plugin.settings.reducedAtStart = value;
						this.plugin.saveSettings();
						this.plugin.settings.reducedAtStart
							? (this.plugin.title.innerHTML = "::")
							: (this.plugin.title.innerHTML = this.app.vault.getName());
					});
			});
	}
}

