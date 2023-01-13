import { App, Plugin, PluginSettingTab, View, Setting} from 'obsidian';

interface EasyGraphSearchSettings {
	defaultSearchString: string;
}

const DEFAULT_SETTINGS: EasyGraphSearchSettings = {
	defaultSearchString: ''
}

export default class EasyGraphSearch extends Plugin {
	settings: EasyGraphSearchSettings;

	async onload() {
		await this.loadSettings();

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'simple-graph-search',
			name: 'Simply jump to the search bar in Graph view',
			hotkeys: [{ modifiers: ["Alt"], key: "f" }],
			checkCallback: (checking: boolean) => {
				// Conditions to check				
				const graphView = this.app.workspace.getActiveViewOfType(View);				
				// Check if null
				if (graphView) {
					// Check if the active view is a graph
					if (graphView.getViewType() == "graph") {	
						// make sure that the graph controls is visable
						graphView.dataEngine.controlsEl.getElementsByClassName("clickable-icon graph-controls-button mod-open")[0].click();
						// make sure that the filter options are not collapsed
						graphView.dataEngine.filterOptions.setCollapsed(false);
						// define the searchbox element
						const searchBox = graphView.dataEngine.filterOptions.search;
						const searchBoxEl = searchBox.inputEl;
						// select the input field
						searchBoxEl.select(true);
						// input a default search term from the settings into the search (only if one exists)
						if(this.settings.defaultSearchString)
						{
							console.log(this.settings.defaultSearchString);				
							searchBox.setValue(this.settings.defaultSearchString);
						}
						// Put the cursor in the end of the input field
						searchBoxEl.setSelectionRange(searchBoxEl.selectionEnd, searchBoxEl.selectionEnd);
					}
				}
				
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new EasyGraphSearchSettingsTab(this.app, this));

	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


class EasyGraphSearchSettingsTab extends PluginSettingTab {
	plugin: EasyGraphSearch;

	constructor(app: App, plugin: EasyGraphSearch) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for the Graph Search Hotkey Plugin:'});

		new Setting(containerEl)
			.setName('Default search string')
			.setDesc('Search String to put into Graph search, this is especially useful if you have certain folders you dont want to show in your graph, e.g. \"-path:journal\". Leave this blank to always put the curso in the end.')
			.addText(text => text
				.setPlaceholder('Enter your search string')
				.setValue(this.plugin.settings.defaultSearchString)
				.onChange(async (value) => {					
					this.plugin.settings.defaultSearchString = value;
					await this.plugin.saveSettings();
				}));
	}
}