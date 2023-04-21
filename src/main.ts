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
		const statusBar = document.querySelector('.status-bar')
		this.title = document.createElement('div');
		this.settings.reducedAtStart ? this.title.innerText = "::" : this.title.innerText = vaultName
		this.title.classList.add("status-bar-vault-name");
		statusBar?.prepend(this.title)

		this.title.addEventListener('click', () => {
			if (this.title.innerText === vaultName) {
				this.title.innerText = "::";
			} else {
				this.title.innerText = vaultName;
			}
		});

	}

	onunload() {
		this.title.detach()

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
							? (this.plugin.title.innerText = "::")
							: (this.plugin.title.innerText = this.app.vault.getName());
					});
			});
	}
}

